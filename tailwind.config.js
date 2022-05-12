module.exports = {
  content: ['./public/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundSize: {
        '100%': '100%',
        '250%': '250%',
      },
      zIndex: {
        '-1': '-1'
      }
    },
  },
  plugins: [],
}
