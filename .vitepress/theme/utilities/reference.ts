export enum ReferenceCrate {
  Abi_context = "abi_context",
  Abi_declarations = "abi_declarations",
  Abi_definitions = "abi_definitions",
  Authentication = "authentication",
  Bootsplash = "bootsplash",
  Device = "device",
  Executable = "executable",
  File_system = "file_system",
  Graphics = "graphics",
  Host_bindings = "host_bindings",
  Internationalization = "internationalization",
  LittleFs = "littlefs",
  Log = "log",
  Memory = "memory",
  Network = "network",
  Synchronization = "synchronization",
  Task = "task",
  Time = "time",
  Users = "users",
  VirtualFileSystem = "virtual_file_system",
  VirtualMachine = "virtual_machine",
  Xila = "xila",
}

export enum ReferenceArchitecture {
  Host = "host",
  Wasm = "wasm",
}

export enum ReferenceKind {
  Structure = "struct",
  Enumeration = "enum",
  Function = "fn",
  Constant = "const",
  Trait = "trait",
  Module = "mod",
  Macro = "macro",
  Type = "type",
}

export function getReferencePath(kind: ReferenceKind, symbol: string): string {
  return `${kind}.${symbol}.html`;
}

export function getReferenceDisplayName(
  crate: ReferenceCrate,
  kind?: ReferenceKind,
  symbol?: string,
): string {
  if (!kind || !symbol) {
    return `<code>${crate}</code> crate`;
  }

  switch (kind) {
    case ReferenceKind.Function:
      return `<code>${symbol}</code>() function`;
    case ReferenceKind.Module:
      return `<code>${symbol}</code> module`;
    case ReferenceKind.Trait:
      return `<code>${symbol}</code> trait`;
    case ReferenceKind.Type:
      return `<code>${symbol}</code> type`;
    case ReferenceKind.Constant:
      return `<code>${symbol}</code> constant`;
    case ReferenceKind.Macro:
      return `<code>${symbol}</code>! macro`;
    case ReferenceKind.Enumeration:
      return `<code>${symbol}</code> enumeration`;
    case ReferenceKind.Structure:
      return `<code>${symbol}</code> structucture`;
    default:
      return `<code>${symbol}</code>`;
  }
}
