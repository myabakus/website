const loaderUtils = require('loader-utils')

module.exports = function (source) {
  const options = loaderUtils.getOptions(this)
  let ignore = options.ignore || []
  if (!Array.isArray(ignore)) {
    ignore = [ignore]
  }
  return source.replace(
    /href="(.+)\.html(\?.+)?"/img,
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
        return `href="${p1}${p2 || ''}"`
      }
    }
  )
}
