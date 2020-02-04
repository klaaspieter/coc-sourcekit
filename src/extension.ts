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

  const serverOptions: ServerOptions = {
    command: commandPath,
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
