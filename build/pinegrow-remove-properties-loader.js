module.exports = function (source) {
  return source.replace(
    /((?:data-pgc)[^=]*="[^"]+")/img,
    (match) => {
      return ''
    }
  )
}
