// markdown-it plugin for generating line numbers.
// It depends on preWrapper plugin.

import type MarkdownIt from 'markdown-it'
import type Token from 'markdown-it/lib/token'

export const lineNumberPlugin = (md: MarkdownIt, enable = false) => {
  const fence = md.renderer.rules.fence!
  md.renderer.rules.fence = (...args) => {
    const rawCode = fence(...args)

    const [tokens, idx] = args
    const token = tokens[idx]

    const lineNumbersValue = extractLineNumbers(token)
    const noLineNumbersValue = extratNoNoLineNumber(token)

    if ((!enable && !lineNumbersValue) || (enable && noLineNumbersValue)) {
      return rawCode
    }

    const startLineNumber = lineNumbersValue || 1

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

function extractLineNumbers(token: Token) {
  return extractLineNumbersFromAttrs(token) || extractLineNumbersFromInfo(token)
}

function extractLineNumbersFromAttrs(token: Token) {
  if (!token.attrs) return null
  const attr = token.attrs.find((x) => x[0] === 'line-numbers')
  if (!attr) return null

  return attr[1] ? parseInt(attr[1]) : 1
}

function extractLineNumbersFromInfo(token: Token) {
  const hasLineNumbers = token.info.match(
    /(?:{.* |{)line-numbers(?:="(\d*)"|}| .*})/
  )
  if (!hasLineNumbers) return extractLineNumbersLagecyInfo(token)

  return hasLineNumbers[1] ? parseInt(hasLineNumbers[1]) : 1
}

function extractLineNumbersLagecyInfo(token: Token) {
  const hasLineNumbers = token.info.match(/:line-numbers(?:=(\d+)|)/)
  if (!hasLineNumbers) return null

  console.warn(
    'the ":line-numbers" syntax is deprecated will be removed in 2.0.0 use the "line-numbers" attribute syntax instad'
  )
  return hasLineNumbers[1] ? parseInt(hasLineNumbers[1]) : 1
}

function extratNoNoLineNumber(token: Token) {
  return (
    extractNoLineNumbersFromAttrs(token) || extractNoLineNumbersFromInfo(token)
  )
}

function extractNoLineNumbersFromAttrs(token: Token) {
  if (!token.attrs) return null
  return token.attrs.find((x) => x[0] === 'no-line-numbers') ? true : null
}

function extractNoLineNumbersFromInfo(token: Token) {
  return (
    /{.*no-line-numbers(?: .*}|})/.test(token.info) ||
    extractNoLineNumbersLagecyFromInfo(token)
  )
}

function extractNoLineNumbersLagecyFromInfo(token: Token) {
  const hasNoLineNumbers = /:no-line-numbers($| )/.test(token.info)
  if (hasNoLineNumbers) {
    console.warn(
      'the ":no-line-numbers" syntax is deprecated will be removed in 2.0.0 use the "line-numbers" attribute syntax instad'
    )
  }
  return hasNoLineNumbers || null
}
