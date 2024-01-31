import type MarkdownIt from 'markdown-it'
import type Token from 'markdown-it/lib/token'

export interface Options {
  hasSingleTheme: boolean
}

export function preWrapperPlugin(md: MarkdownIt, options: Options) {
  const fence = md.renderer.rules.fence!
  md.renderer.rules.fence = (...args) => {
    const [tokens, idx] = args
    const token = tokens[idx]

    // remove title from info
    token.info = token.info.replace(/\[.*\]/, '')

    const active = / active( |$)/.test(token.info) ? ' active' : ''
    token.info = token.info.replace(/ active$/, '').replace(/ active /, ' ')

    const lang = extractLang(token.info)
    const classes = `language-${lang}${getAdaptiveThemeMarker(
      options
    )}${active}`
    const classAttr = token.attrs && token.attrs.find((x) => x[0] === 'class')

    if (classAttr != null) {
      classAttr[1] = `${classes}  ${classAttr[1]}`
    } else {
      const attrs: Array<[string, string]> = [['class', classes]]

      token.attrs = token.attrs ? token.attrs.concat(attrs) : attrs
    }

    const fileName = extractFileName(token)
    const annotation = fileName ? fileName : lang
    const rawCode = fence(...args)
    return `<div ${md.renderer.renderAttrs(
      token
    )}><button title="Copy Code" class="copy"></button><span class="lang">${annotation}</span>${rawCode}</div>`
  }
}

export function getAdaptiveThemeMarker(options: Options) {
  return options.hasSingleTheme ? '' : ' vp-adaptive-theme'
}

export function extractTitle(info: string, html = false) {
  if (html) {
    return (
      info.replace(/<!--[^]*?-->/g, '').match(/data-title="(.*?)"/)?.[1] || ''
    )
  }
  return info.match(/\[(.*)\]/)?.[1] || extractLang(info) || 'txt'
}

function extractFileName(token: Token) {
  return extractFileNameFromAttrs(token) || extractFileNameFromInfo(token)
}

function extractFileNameFromAttrs(token: Token) {
  return (token.attrs && token.attrs.find((x) => x[0] === 'file-name'))?.[1]
}

function extractFileNameFromInfo(token: Token) {
  return token.info.match(/{.*file-name="(.*)".*}/)?.[1]
}

function extractLang(info: string) {
  return info
    .trim()
    .replace(/=(\d*)/, '')
    .replace(/:(no-)?line-numbers({| |$|=\d*).*/, '')
    .replace(/(-vue|{| ).*$/, '')
    .replace(/^vue-html$/, 'template')
    .replace(/^ansi$/, '')
}
