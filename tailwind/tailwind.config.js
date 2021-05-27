// const { fontSize, fontFamily } = require("tailwindcss/defaultTheme");
const colors = require('tailwindcss/colors');

module.exports = {
  purge: [
    '../articles/*.html',
    '../articulos/*.html',
    '../js/hero.js'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // Build your palette here
        lightBlue: colors.lightBlue,
        orange: colors.orange,
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
    },
      backgroundImage: theme => ({
        'line-pattern': "url('../images/background.svg')",
       }),
      typography: {
        DEFAULT: {
          css: {
            fontFamily: {
              sans: ["Quattrocento Sans", "sans-serif"],
              heading: ["Paytone One", "sans-serif"],
            },
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
