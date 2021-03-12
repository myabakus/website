const loaderUtils = require('loader-utils')

module.exports = function (source) {
  const options = loaderUtils.getOptions(this)
  let ignore = options.ignore || []
  if (!Array.isArray(ignore)) {
    ignore = [ignore]
  }
  return source.replace(
    /href="(.+)\.html([#?].+)?"/img,
    (match, p1, p2) => {
      if (ignore.some(evaluate => {
        const isString = typeof evaluate === 'string'
        let search = p1
        if (isString && evaluate.includes('.html')) {
          search += '.html'
        }
        return isString ?
          search.indexOf(evaluate) === 0 :
          evaluate.test(search)
      })) {
        return match
      } else {
        if (p1.indexOf('../') === 0) {
          p1 = p1.replace('../', '/');
        }
        if (p1 === 'index') {
          p1 = './';
        } else {
          p1 = p1.replace('index', '');
        }
        return `href="${p1}${p2 || ''}"`
      }
    }
  )
}
