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
|`sourcekit.trace.server`|Trace the communication between coc and the sourcekit language server|

## Development

1. Run `yarn build` or `yarn build:watch`
2. Run `yarn run link:add` to link extension
3. Open a Swift file in vim

To see that it worked use [`:CocOpenLog`].


Alternatively a [`.env`](.env) is provided which allows for tailing the logs outside of vim:

```sh
# In the split/tab you will open vim
source .env

# In another split/tab
tail -f coc.log
```

Or source it [automatically](https://github.com/klaaspieter/dotfiles/blob/5c2c1a6fa1a6f9ccc9031c3dc8de2ea9a3c4fdb0/zshrc#L327-L334).

[`:CocOpenLog`]: https://github.com/neoclide/coc.nvim/blob/db5ffd2ff0d766c2cfbd711898e8a3f5736e038c/doc/coc.txt#L1659

## Acknowledgements

- [josa42] for [coc-go] and [coc-sh]. This repo started out as a copy of [coc-go] and I used [coc-sh] as a reference implementation.

[josa42]: https://github.com/josa42
[coc-go]: https://github.com/josa42/coc-go
[coc-sh]: https://github.com/josa42/coc-sh
