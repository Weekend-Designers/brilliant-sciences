module.exports = {
  important: true,
  content: [
    "./pages/**/*.js",
    "./components/**/*.js",
  ],
  // purge: [],
  // darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundPosition: {
      "ng35-0": "-35rem 0rem",
      "center": "center",
    },
    width: {
      "full": "100%",
      "7.5rm": "7.5rem",
      "auto": "auto",
    },
    maxWidth: {
      "3/5": "60%",
      "full": "100%",
    },
    padding: {
      "1rm-3rm": "1rem 3rem",
      "3rm": "3rem",
    },
    screens: {
      'xsm': '360px',
      'sm': '640px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    }
  },
  // variants: {
  //   extend: {},
  // },
  plugins: [],
}
