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

export function getReferencePath(
  kind: ReferenceKind,
  identifier: string,
): string {
  return `${kind}.${identifier}.html`;
}
