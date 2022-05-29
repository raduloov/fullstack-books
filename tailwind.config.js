module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundColor: '#000'
    },
    screens: {
      sm: { max: '450px' },
      md: { max: '1480px' },
      'md-min': '700px'
    },
    fontFamily: {
      montserrat: ['Montserrat', 'sans-serif']
    }
  },
  plugins: []
};
