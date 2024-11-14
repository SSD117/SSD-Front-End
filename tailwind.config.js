module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        neodgm: ['neodgm', 'sans-serif'],
      },
      colors: {
        customY:'#F9D142',
        customBK:'#292826',
        main01:'#0063B2',
        main02:'#9CC3D5',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
