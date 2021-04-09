const { fontSize, fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  purge: {
    mode: "all",
    content: ["../articles/*.html", "../articulos/*.html"],
    options: {
      keyframes: true,
    },
    preserveHtmlElements: false,
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
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
              fontFamily: "Paytone One",
            },
            // ...
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
