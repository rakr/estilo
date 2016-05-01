Estilo
======

Generate full vim colorschemes from yaml templates with node.js


## Install

```sh
npm install -g estilo
```

## Usage

```sh
estilo mytemplate.yaml mycolorscheme.vim
# will generate mycolorscheme.vim
```

## Template example

```yaml
info:
  author: 'John Doe'
  scheme: 'supercolors'
  background: 'dark'
  description: 'A cool scheme'
  license: 'MIT'
  version: '0.0.1'
colors:
  dark: '#282828'
hilinks:
  Comment: '#aaaaaa dark'
  Constant: '#ff0000 #0000ff bi'
  Search: '@constant'
```

will generate:

```vim
"
" supercolors v0.0.1
" A cool scheme
" author: John Doe
" license: MIT
" background: dark
"
" This file was generated by *estilo*
" https://github.com/jacoborus/estilo

let colors_name="supercolors"
hi clear
if exists("syntax_on")
  syntax reset
endif
if has("gui_running")
  set background=dark
endif

hi Comment guifg=#aaaaaa ctermfg=248 guibg=#282828 ctermbg=235 gui=NONE cterm=NONE
hi Constant guifg=#ff0000 ctermfg=9 guibg=#0000ff ctermbg=12 gui=bold,italic cterm=bold,italic
hi link Search Constant
```
