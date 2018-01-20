
var app = new Vue({
  el: '#app',
  data: data,
  filters: {
    slugify: function (value) {
      return '/videos/' + value.toString().toLowerCase()
        .replace(/á/gi, 'a')
        .replace(/é/gi, 'e')
        .replace(/í/gi, 'i')
        .replace(/ó/gi, 'o')
        .replace(/ú/gi, 'u')
        .replace(/ñ/gi, 'n')
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim -
    }
  }
});
