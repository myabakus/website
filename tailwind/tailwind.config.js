const { fontSize, fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  purge: [
    '../articles/*.html',
    '../articulos/*.html'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
        'line-pattern': "url('../images/background.svg')",
       }),
      fontFamily: {
        sans: ["Quattrocento Sans", "sans-serif"],
        heading: ["Paytone One", "sans-serif"],
      },
      typography: {
        DEFAULT: {
          css: {
            fontSize: "1.125rem",
            h1: {
              // fontSize: '2.25rem',
              // fontFamily: "Paytone One",
            },
            // ...
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
