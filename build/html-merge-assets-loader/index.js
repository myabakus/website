const fs = require('fs')
const uglify = require('uglify-es')
const path = require('path')
const loaderUtils = require('loader-utils')

const RGX_HEAD = /<head>([^]+)<\/head>/im
const RGX_BODY = /<(?:body[^>]*)>([^]+)<\/body>/im
const RGX_LINK = /((?:<link)[^>]+href="([^"]+)"[^>]*>)/img
const RGX_CONDITIONAL = /<!--\[if[^\]]+]>([^]+)<\!\[endif\]-->/im
const RGX_SCRIPT = /((?:<script)[^>]+src="([^"]+)"[^>]*><\/script>)/img

module.exports = function (content) {
  return loader(content, loaderUtils.getOptions(this))
}

function loader(content, options) {
  options = options || {}
  options.css = options.css || {}
  options.js = options.js || {}
  const head = extractContent(RGX_HEAD, content)
  const headLinks = extractAssets(RGX_LINK, head)
  let headScripts = extractAssets(RGX_SCRIPT, head)
  const conditional = extractContent(RGX_CONDITIONAL, head)
  const headScriptsConditional = extractAssets(RGX_SCRIPT, conditional)
  headScripts = extractUnique(headScripts, headScriptsConditional)
  let scriptInline = options.js.inline || []
  if (scriptInline) {
    scriptInline = copyAssets(headScripts, scriptInline)
    headScripts = extractUnique(headScripts, scriptInline)
  }
  const body = extractContent(RGX_BODY, content)
  const bodyScripts = extractAssets(RGX_SCRIPT, body)
  content = replaceInlineScript(content, scriptInline)
  // content = replaceAssets(content, headLinks, options.css, replaceLink)
  // console.log(content)
  return content
}

function replaceInlineScript(html, scripts) {
  const source = []
  let replace = ''
  for (const [src, script] of scripts) {
    source.push(getContent(src))
    if (!replace) {
      replace = script
    } else {
      html = html.replace(script, '')
    }
  }
  if (replace) {
    const minify = uglify.minify(source.join('\n'))
    html = html.replace(
      replace,
      `<script>${minify.code}</script>`
    )
  }
  return html
}

function replaceLink(main) {
  return `<link href="${main}" rel="stylesheet">`
}

function replaceAssets(html, assets, merge, callback) {
  if (merge) {
    let index
    const replace = {}
    Object.entries(merge).forEach(([main, entries]) => {
      replace[main] = []
      entries.forEach(entry => {
        if ((index = findAsset(assets, entry)) !== -1) {
          replace[main].push(assets[index])
          assets.splice(index, 1)
        }
      })
    })
    Object.entries(replace).forEach(([main, entries]) => {
      if (entries.length > 0) {
        entries.forEach(([, link], index) => {
          if (!index) {
            html = html.replace(link, callback(main))
          } else {
            html = html.replace(link, '')
          }
        })
      }
    })
  }
  return html
}

function extractContent(rgx, html) {
  const result = html.match(rgx)
  if (result !== null) {
    return result[1]
  }
  return ''
}

function extractAssets(rgx, content) {
  var entry;
  const result = [];
  while ((entry = rgx.exec(content)) !== null) {
    const input = entry[1]
    const link = entry[2]
    if (link.indexOf('//') === -1 &&
      link.indexOf('data:image') === -1 &&
      link.match(/\.(js|css)/) !== null
    ) {
      result.push([link, input])
    }
  }
  return result
}

function extractUnique (original, optional) {
  return original.reduce((newArray, entry) => {
    if (!optional.some(child => child[0] === entry[0])) {
      newArray.push(entry)
    }
    return newArray
  }, [])
}

function findAsset(assets, entry) {
  return assets.findIndex(([path]) => {
    return path === entry
  })
}

function copyAssets (original, options) {
  return original.reduce((newArray, entry) => {
    if (options.some(asset => asset === entry[0])) {
      newArray.push(entry)
    }
    return newArray
  }, [])
}

function getContent(filename) {
  filename = path.resolve(filename)
  return fs.readFileSync(filename, {encoding: 'utf8'})
}
