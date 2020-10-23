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
  sdk: string
  targetArch: string
  args: string[]
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

  let args: string[] = []
  const sdkPath = config.sdkPath
  const sdk = config.sdk
  if (sdkPath) {
      args = args.concat(['-Xswiftc', '-sdk', '-Xswiftc', sdkPath])
  } else if (sdk) {
      try {
          const computedSdkPath = (await workspace.runCommand(`xcrun --sdk ${sdk} --show-sdk-path`)).trim()
          args = args.concat(['-Xswiftc', '-sdk', '-Xswiftc', computedSdkPath])
      } catch {
          workspace.showMessage(`Cannot find SDK path for '${sdk}'. Change 'sourcekit.sdk' or set 'sourcekit.sdkPath' in your coc-config.`)
      }
  }

  const targetArch = config.targetArch
  if (targetArch) {
      args = args.concat(['-Xswiftc', '-target', '-Xswiftc', targetArch])
  }

  args = args.concat(config.args)

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
