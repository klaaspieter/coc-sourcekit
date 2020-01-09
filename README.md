# coc-sourcekit

Sourcekit language server extension for [coc].

[coc]: https://github.com/neoclide/coc.nvim

## Install

In vim or neovim, run command:

```sh
:CocInstall coc-sourcekit
```

`sourcekit-lsp` is still under heavy development and is not provided with Xcode's default toolchain. For coc-sourcekit to work you will need to [download your own toolchain](https://github.com/apple/sourcekit-lsp#getting-started).

## Features

See [sourcekit-lsp].

[sourcekit-lsp]: https://github.com/apple/sourcekit-lsp


## Configuration options

|Key|Description|Default|
|----|------------|-----|
|`sourcekit.enable`|Enable sourcekit extension|true|
|`sourcekit.commandPath`|Path to sourcekit-lsp binary|Output of `xcrun --toolchain swift --find sourcekit-lsp`|

## Development

1. Run `yarn build` or `yarn build:watch`
2. Run `yarn run link:add` to link extension

## Acknowledgements

- [josa42] for [coc-go] and [coc-sh]. This repo started out as a copy of [coc-go] and I used [coc-sh] as a reference implementation.

[josa42]: https://github.com/josa42
[coc-go]: https://github.com/josa42/coc-go
[coc-sh]: https://github.com/josa42/coc-sh
