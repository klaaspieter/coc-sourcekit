import {
  TransportKind,
  ExtensionContext,
  LanguageClient,
  ServerOptions,
  workspace,
  services,
  LanguageClientOptions
} from 'coc.nvim'

interface SourceKitConfig {
  enable: boolean
  commandPath: string
  sdkPath: string
  targetArch: string
}

export async function activate(context: ExtensionContext): Promise<void> {
  const config = workspace.getConfiguration().get('sourcekit', {}) as SourceKitConfig
  if (config.enable === false) {
    return
  }

  let commandPath = config.commandPath
  if (!commandPath) {
    try {
      commandPath = (await workspace.runCommand('xcrun --toolchain swift --find sourcekit-lsp')).trim()
    } catch {
      workspace.showMessage("Cannot find sourcekit-lsp. Install a Swift toolchain or set `sourcekit.commandPath` in your coc-config.")
      return
    }
  }

  let args: string[] = [];
  let sdkPath = config.sdkPath
  if (!sdkPath) {
      try {
          sdkPath = (await workspace.runCommand('xcrun --sdk iphonesimulator --show-sdk-path')).trim()
          args = args.concat(['-Xswiftc', '-sdk', '-Xswiftc', sdkPath])
      } catch {
          workspace.showMessage("Cannot find SDK path. set `sourcekit.sdkPath` in your coc-config.")
      }
  }else{
      args = args.concat(['-Xswiftc', '-sdk', '-Xswiftc', sdkPath])
  }

  let targetArch = config.targetArch
  if (targetArch) {
      args = args.concat(['-Xswiftc', '-target', '-Xswiftc', targetArch])
  }else{
      args = args.concat(['-Xswiftc', '-target', '-Xswiftc', 'x86_64-apple-ios13.2-simulator'])
      //workspace.showMessage("Cannot find target Architecture. set `sourcekit.targetArch` in your coc-config.")
  }

  const serverOptions: ServerOptions = {
    command: commandPath,
    args: args,
    transport: TransportKind.stdio
  }

  const clientOptions: LanguageClientOptions = {
    documentSelector: ['swift']
  }

  const client = new LanguageClient('sourcekit', 'sourcekit', serverOptions, clientOptions)

  context.subscriptions.push(
    services.registLanguageClient(client),
  )
}
