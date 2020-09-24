const fs = require('fs')
const uglify = require('uglify-es')
const path = require('path')
const loaderUtils = require('loader-utils')
const ConcatSource = require('webpack-sources').ConcatSource
const OriginalSource = require('webpack-sources').OriginalSource

const RGX_HEAD = /<head>([^]+)<\/head>/im
const RGX_BODY = /<(?:body[^>]*)>([^]+)<\/body>/im
const RGX_LINK = /((?:<link)[^>]+href="([^":]+)"[^>]*>)/img
const RGX_CONDITIONAL = /<!--\[if[^\]]+]>([^]+)<\!\[endif\]-->/im
const RGX_SCRIPT = /((?:<script)[^>]+src="([^"]+)"[^>]*><\/script>)/img

module.exports = function (content) {
  const options = Object.assign({}, loaderUtils.getOptions(this) || {})
  return loader(content, options, this)
}

function loader(content, options, self) {
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
    scriptInline = copyAssets(headScripts, scriptInline, self)
    headScripts = extractUnique(headScripts, scriptInline)
  }
  const body = extractContent(RGX_BODY, content)
  let bodyScripts = extractAssets(RGX_SCRIPT, body)
  content = replaceInlineScript(content, scriptInline, self)

  if (headScriptsConditional) {
    content = replaceAssets(self, content, headScriptsConditional, options.js, replaceScript)
  }
  if (bodyScripts) {
    let scriptInline = options.js.inlineFooter || []
    if (scriptInline) {
      scriptInline = copyAssets(bodyScripts, scriptInline, self)
      bodyScripts = extractUnique(bodyScripts, scriptInline)
      content = replaceInlineScript(content, scriptInline, self)
    }
    content = replaceAssets(self, content, bodyScripts, options.js, replaceScript)
  }
  content = replaceAssets(self, content, headLinks, options.css, replaceLink)
  return content
}

function replaceInlineScript(html, scripts, self) {
  const source = []
  let replace = ''
  for (const [src, script] of scripts) {
    source.push(getContent(self, src))
    if (!replace) {
      replace = script
    } else {
      html = html.replace(script, '')
    }
  }
  if (replace) {
    const minify = uglify.minify(source.join('\n')).code
    html = html.replace(
      replace,
      `<script>${minify}</script>`
    );
  }
  return html
}

function replaceConditionalScript(content, scripts, self) {
  return content
}

function replaceLink(main) {
  return `<link href="${main}" rel="stylesheet">`
}

function replaceScript(main) {
  return `<script src="${main}"></script>`
}

function compareAssets(entries, assets, self) {
  const result = [];
  entries.forEach(entry => {
    if ((index = findAsset(assets, entry, self)) !== -1) {
      result.push(assets[index][0].replace('../', ''));
    }
  });
  return JSON.stringify(entries) === JSON.stringify(result);
}

function replaceAssets(self, html, assets, merge, callback) {
  if (merge) {
    let index
    const replace = {};
    Object.entries(merge).forEach(([main, entries]) => {
      replace[main] = []
      if (compareAssets(entries, assets, self)) {
        entries.forEach(entry => {
          if ((index = findAsset(assets, entry, self)) !== -1) {
            replace[main].push(assets[index])
            assets.splice(index, 1)
          }
        });
      }
    })
    Object.entries(replace).forEach(([main, entries]) => {
      if (entries.length) {
        entries.forEach(([, link], index) => {
          if (!index) {
            createSource(self, main, entries)
            let replace = main
            if (link.indexOf('../') !== -1 || diferentContext(self)) {
              replace = '../' + main
            }
            html = html.replace(link, callback(replace))
          } else {
            html = html.replace(link, '')
          }
        })
      }
    })
  }
  return html
}

function createSource (self, main, entries) {
  if (!fs.existsSync(main)) {
    const source = new ConcatSource()
    for (const [path] of entries) {
      const content = getContent(self, path)
      const filename = resolveFilename(self, path)
      source.add(new OriginalSource(content, filename))
    }
    let content = source.source()
    if (main.indexOf('.js') !== -1) {
      content = uglify.minify(content).code
    }
    fs.writeFileSync(main, content)
  }
  self.minimize = true
  self.addDependency(main)
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

function findAsset(assets, entry, self) {
  return assets.findIndex(([url]) => {
    const absolute = path.resolve(self._compiler.context, entry)
    return (path.resolve(self.context, url) === absolute) || (path.resolve(self.context, '../' + url) === absolute)
  })
}

function diferentContext (self) {
   return self.context !== self._compiler.context
}

function copyAssets (original, options, self) {
  return original.reduce((newArray, entry) => {
    if (options.some(asset => {
      return path.resolve(self._compiler.context, asset) === path.resolve(self.context, entry[0])
    })) {
      newArray.push(entry)
    }
    return newArray
  }, [])
}

function getContent(self, filename) {
  filename = resolveFilename(self, filename)
  return fs.readFileSync(filename, {encoding: 'utf8'})
}

function resolveFilename(self, name) {
  return path.resolve(self.context, name)
}
