---
layout: doc
docType: reference
description: Xila shell composition syntax, expansion rules, statuses, resource limits, and built-in command inventory.
---

# Shell reference

Xila's command-line shell implements a bounded command language for interactive use and `shell -c`. It is intentionally smaller than POSIX shell syntax.

## Invocation

Interactive input is parsed one line at a time. When the shell executable receives already-separated arguments, those arguments are preserved literally. Use `-c` to explicitly parse command source:

```text
shell -c 'echo first | wc -l'
```

EOF executes a final unterminated interactive line.

## Composition operators

```sh
export NAME='hello world'; echo "$NAME"
echo first > /temporary/example; echo second >> /temporary/example
cat < /temporary/example | wc -l
missing-command 2> /temporary/errors || echo recovered
long-running-command > /temporary/result & echo foreground
```

| Syntax     | Behavior                                                             |
| ---------- | -------------------------------------------------------------------- |
| `A \| B`  | Run pipeline stages concurrently; the pipeline status is B's status. |
| `A && B`   | Run B only when A succeeds.                                          |
| `A || B`   | Run B only when A fails.                                             |
| `A ; B`    | Run sequential command lists.                                        |
| `A &`      | Start the preceding conditional list in a background task.           |
| `< FILE`   | Read standard input from FILE.                                       |
| `> FILE`   | Create/truncate FILE for standard output.                            |
| `>> FILE`  | Append standard output to FILE.                                      |
| `2> FILE`  | Create/truncate FILE for standard error.                             |
| `2>> FILE` | Append standard error to FILE.                                       |

`|` binds more tightly than `&&` and `||`. The two conditional operators have equal precedence and evaluate left to right. Redirections belong to one command, are applied left to right, and override a pipeline endpoint when they target the same stream.

Background input is `/devices/null`. Output and error inherit the shell's streams unless redirected and may interleave with foreground output. The shell supports up to eight active background lists; job listing, cancellation, and foreground/background switching are not implemented.

## Quoting and expansion

- Single quotes preserve contents literally.
- Double quotes allow variable expansion.
- Outside single quotes, backslash protects the following character.
- Inside double quotes, backslash protects `$`, `"`, and `\`.
- `#` at a word boundary begins a comment.
- `$NAME`, `${NAME}`, and `$?` expand while a command is prepared.
- Variable names use ASCII letters, digits, and underscores, with a letter or underscore first.
- Missing variables expand to an empty string.

Expansion does not split a variable value on whitespace and does not reinterpret the value as shell operators. Quoted and unquoted fragments may form one argument.

## Exit statuses

| Case                              | Status                   |
| --------------------------------- | ------------------------ |
| Success                           | 0                        |
| General built-in failure          | 1                        |
| `false`                           | 1                        |
| Malformed `shell -c` source       | 2                        |
| Unknown command                   | 127                      |
| External executable               | Preserved within 0–255   |
| Pipeline                          | Status of the last stage |
| Successful background-list launch | Sets `$?` to 0           |

`$?` contains the preceding foreground status.

## Resource limits

| Resource                                             |      Limit |
| ---------------------------------------------------- | ---------: |
| Source line                                          | 4096 bytes |
| Tokens per line                                      |        256 |
| Commands per line                                    |         32 |
| Stages per pipeline                                  |          8 |
| Expanded arguments and redirection paths per command | 8192 bytes |
| Buffered formatted output per built-in               | 8192 bytes |
| Buffered bytes per pipe                              |        512 |
| Active background lists per shell                    |          8 |

These limits bound shell-owned parsing and pipe storage. They do not bound allocations made by launched commands, inherited environment data, the WASM runtime, or task infrastructure.

## Built-in commands

`help` lists registered built-ins and executable entries found in the task's `Paths` locations. `help COMMAND` prints usage for a built-in without launching it.

The current built-in registry contains:

| Area              | Commands                                                               |
| ----------------- | ---------------------------------------------------------------------- |
| Shell/state       | `true`, `false`, `exit`, `cd`, `pwd`, `clear`, `help`                  |
| Environment       | `export`, `unset`, `printenv`, `which`                                 |
| Files/directories | `ls`, `cat`, `stat`, `mkdir`, `rm`, `rmdir`, `realpath`, `touch`, `mv` |
| Text/streams      | `echo`, `grep`, `wc`, `head`, `tail`, `tree`                           |
| Timing            | `sleep`                                                                |
| Permissions       | `chmod`                                                                |
| Network           | `web_request`, `dns_resolve`, `ping`, `ip`                             |

Selected recent utilities:

- `grep PATTERN [FILE]...` performs literal substring matching and reads standard input when no file is supplied or a file operand is `-`.
- `touch FILE...` creates missing files and updates access and modification times.
- `realpath PATH...` prints canonical absolute paths for existing files/directories.
- `sleep DURATION` accepts a nonnegative integer followed by `ms`, `s`, `m`, or `h`; no suffix means seconds.
- `chmod MODE PATH` accepts octal permissions from `000` through `777`, optionally with a leading zero.
- `tree [-L N] [PATH]` streams a hierarchy without collecting sibling entries; depth is bounded to 32.
- `mv SOURCE DESTINATION` renames within one mounted filesystem and uses the exact destination path.

Use `help COMMAND` for the authoritative option syntax of built-ins not detailed here.

## Unsupported shell syntax

The current language does not implement script files, multiline syntax, command substitution, globbing, subshells, descriptor duplication such as `2>&1`, here-documents, or shell assignment syntax. Newline characters inside explicit command source are whitespace; use `;` to separate commands.

## Related documentation

- [Command-line shell architecture](/explanation/architecture/executables/command_line_shell).
- <CodeReference path="executables/shell/command_line/README.md" />.
- <CodeReference path="executables/shell/command_line/src/commands/mod.rs" />.

<!-- prettier-probe -->
