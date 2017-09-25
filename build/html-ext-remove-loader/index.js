const loaderUtils = require('loader-utils');

module.exports = function (source) {
  const options = loaderUtils.getOptions(this);
  let ignore = options.ignore || []
  if (!Array.isArray(ignore)) {
    ignore = [ignore]
  }
  return source.replace(
    /href="(.+).\html"/img,
    (match, p1) => {
      if (ignore.some(evaluate => {
        return evaluate instanceof RegExp ?
          evaluate.test(p1) :
          p1.indexOf(evaluate) === 0
      })) {
        return match
      } else {
        return `href="${p1}"`
      }
    }
  )
}
