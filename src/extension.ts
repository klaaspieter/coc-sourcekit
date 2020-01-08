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

  const serverOptions: ServerOptions = {
    command: config.commandPath,
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
