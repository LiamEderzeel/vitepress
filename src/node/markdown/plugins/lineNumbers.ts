// markdown-it plugin for generating line numbers.
// It depends on preWrapper plugin.

import type MarkdownIt from 'markdown-it'

// const lineNumbersRE = /line-numbers="(.*?)"/
const fallBackLineNumbersRE = /:line-numbers=(\d*)/

export const lineNumberPlugin = (md: MarkdownIt, enable = false) => {
  const fence = md.renderer.rules.fence!
  md.renderer.rules.fence = (...args) => {
    console.log('test')
    const rawCode = fence(...args)

    const [tokens, idx] = args
    const token = tokens[idx]
    const { info } = token

    console.log(info)

    const attrLn =
      token.attrs && token.attrs.find((x) => x[0] === 'line-numbers')
    console.log(attrLn)
    const hasLineNumbers = attrLn || /:line-numbers($| |=)/.test(info)

    const attrNln =
      token.attrs && token.attrs.find((x) => x[0] === 'no-highlight-numbers')
    const hasNoLineNumbers = attrNln || /:no-line-numbers($| )/.test(info)

    if ((!enable && !hasLineNumbers) || (enable && hasNoLineNumbers)) {
      return rawCode
    }

    // if (
    //   (!enable && !/line-numbers($| |=)/.test(info)) ||
    //   (enable && /no-line-numbers($| )/.test(info))
    // ) {
    //   return rawCode
    // }

    let startLineNumber = 1
    const matchStartLineNumber =
      (attrLn && attrLn[1]) || info.match(fallBackLineNumbersRE)?.[1]
    if (matchStartLineNumber) {
      startLineNumber = parseInt(matchStartLineNumber)
    }
    // let startLineNumber = 1
    // const matchStartLineNumber = info.match(/line-numbers="(.*?)"/)
    // if (matchStartLineNumber && matchStartLineNumber[1]) {
    //   startLineNumber = parseInt(matchStartLineNumber[1])
    // }

    const code = rawCode.slice(
      rawCode.indexOf('<code>'),
      rawCode.indexOf('</code>')
    )

    const lines = code.split('\n')

    const lineNumbersCode = [...Array(lines.length)]
      .map(
        (_, index) =>
          `<span class="line-number">${index + startLineNumber}</span><br>`
      )
      .join('')

    const lineNumbersWrapperCode = `<div class="line-numbers-wrapper" aria-hidden="true">${lineNumbersCode}</div>`

    const finalCode = rawCode
      .replace(/<\/div>$/, `${lineNumbersWrapperCode}</div>`)
      .replace(/"(language-[^"]*?)"/, '"$1 line-numbers-mode"')

    return finalCode
  }
}
