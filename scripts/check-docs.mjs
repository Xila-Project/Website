import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "src");
const output = path.join(root, ".vitepress", "dist");
const errors = new Set();

function files(directory, extension) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) return files(full, extension);
    return entry.name.endsWith(extension) ? [full] : [];
  });
}

function decode(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)));
}

const pages = files(source, ".md");
const types = {
  tutorials: "tutorial",
  "how-to": "how-to",
  reference: "reference",
  explanation: "explanation",
};
for (const file of pages) {
  const relative = path.relative(source, file);
  const section = relative.split(path.sep)[0];
  if (!types[section] || path.basename(file) === "index.md") continue;
  const frontmatter = fs
    .readFileSync(file, "utf8")
    .match(/^---\n([\s\S]*?)\n---/);
  const metadata = frontmatter?.[1] ?? "";
  const type = metadata.match(/^docType:\s*(.+)$/m)?.[1]?.trim();
  if (type !== types[section])
    errors.add(`${relative}: expected docType ${types[section]}`);
  if (!/^description:\s*\S/m.test(metadata))
    errors.add(`${relative}: missing description`);
}

if (!fs.existsSync(output)) {
  console.error(
    "Build the site with npm run docs:build before validating documentation.",
  );
  process.exit(1);
}

const rendered = files(output, ".html");
const documents = new Map(
  rendered.map((file) => {
    const html = fs.readFileSync(file, "utf8");
    const ids = new Set(
      [...html.matchAll(/\bid=(?:"([^"]*)"|'([^']*)')/g)].map((match) =>
        decode(match[1] ?? match[2]),
      ),
    );
    return [file, { html, ids }];
  }),
);

function resolveTarget(current, href) {
  const currentUrl =
    "https://docs.invalid/" +
    path.relative(output, current).split(path.sep).join("/");
  const target = new URL(decode(href), currentUrl);
  if (target.origin !== "https://docs.invalid") return null;
  let pathname = decodeURIComponent(target.pathname);
  if (pathname.endsWith("/")) pathname += "index.html";
  else if (!path.extname(pathname)) pathname += ".html";
  return {
    file: path.join(output, pathname),
    anchor: decodeURIComponent(target.hash.slice(1)),
  };
}

let links = 0;
let anchors = 0;
for (const [file, { html }] of documents) {
  const visited = new Set();
  for (const match of html.matchAll(
    /<a\b[^>]*\bhref=(?:"([^"]*)"|'([^']*)')/g,
  )) {
    const href = match[1] ?? match[2];
    if (!href || visited.has(href)) continue;
    visited.add(href);
    const target = resolveTarget(file, href);
    if (!target) continue;
    links += 1;
    if (!fs.existsSync(target.file)) {
      errors.add(
        `${path.relative(output, file)}: missing link ${decode(href)}`,
      );
    } else if (target.anchor) {
      anchors += 1;
      if (!documents.get(target.file)?.ids.has(target.anchor)) {
        errors.add(
          `${path.relative(output, file)}: missing anchor ${decode(href)}`,
        );
      }
    }
  }
}

// Source paths can be checked offline when a sibling Core checkout is available.
const core = process.env.XILA_CORE_PATH ?? path.resolve(root, "..", "core");
let references = 0;
if (fs.existsSync(path.join(core, "Cargo.toml"))) {
  for (const file of pages) {
    for (const match of fs
      .readFileSync(file, "utf8")
      .matchAll(/<CodeReference\s+path="([^"]+)"/g)) {
      references += 1;
      if (!fs.existsSync(path.join(core, match[1]))) {
        errors.add(
          `${path.relative(source, file)}: missing Core source path ${match[1]}`,
        );
      }
    }
  }
} else {
  console.log(
    "Core source-path checks skipped: set XILA_CORE_PATH to a local checkout.",
  );
}

if (errors.size) {
  console.error([...errors].join("\n"));
  process.exit(1);
}
console.log(
  `Validated ${pages.length} source pages, ${links} rendered internal links, ${anchors} anchors, and ${references} Core source references.`,
);
