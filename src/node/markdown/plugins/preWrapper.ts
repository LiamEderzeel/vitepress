import type Token from 'markdown-it/lib/token'
import type MarkdownIt from 'markdown-it'

export interface Options {
  hasSingleTheme: boolean
}

export function preWrapperPlugin(md: MarkdownIt, options: Options) {
  const fence = md.renderer.rules.fence!
  md.renderer.rules.fence = (...args) => {
    const [tokens, idx] = args
    const token = tokens[idx]
    const filenameAttr =
      token.attrs && token.attrs.find((x) => x[0] === 'file-name')

    let filename = filenameAttr?.[1]

    if (!filename) {
      filename = token.info.match(/file-name="(.*?)"/)?.[1]
    }
    // remove title from info
    // token.info = token.info.replace(/\[.*\]/, '')

    const active = / active( |$)/.test(token.info) ? ' active' : ''
    token.info = token.info.replace(/ active$/, '').replace(/ active /, ' ')

    // let filename
    // if (/file-name="(.*?)"/.test(token.info)) {
    //   const filename = token.info.match(/file-name="(.*?)"/)![1]
    // }

    const lang = extractLang(token.info)
    const annotation = filename ? filename : lang
    const rawCode = fence(...args)
    return `<div class="language-${lang}${getAdaptiveThemeMarker(
      options
    )}${active}"><button title="Copy Code" class="copy"></button><span class="lang">${annotation}</span>${rawCode}</div>`
  }
}

export function getAdaptiveThemeMarker(options: Options) {
  return options.hasSingleTheme ? '' : ' vp-adaptive-theme'
}

export function extractTitle(value: string | Token, html = false) {
  const isToken = (value: string | Token): value is Token => {
    return typeof value === 'object'
  }

  const info = isToken(value) ? value.info : value

  if (html) {
    return (
      info.replace(/<!--[^]*?-->/g, '').match(/data-title="(.*?)"/)?.[1] || ''
    )
  }
  return (
    (isToken(value) &&
      value.attrs &&
      value.attrs.find((x) => x[0] === 'tab-name')?.[1]) ||
    info.match(/tab-name="(.*?)"/)?.[1] ||
    info.match(/\[(.*)\]/)?.[1] ||
    extractLang(info) ||
    'txt'
  )
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
