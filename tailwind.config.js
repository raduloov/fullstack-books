module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        'slide-right': {
          '0%': { transform: 'translateX(-100%)' }
          // '100%': { transform: 'translateX(0%)' }
        },
        'blur-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        }
      }
    },
    screens: {
      sm: { max: '450px' },
      md: { max: '1320px' },
      lg: '1320px'
    },
    fontFamily: {
      montserrat: ['Montserrat', 'sans-serif']
    }
  },
  plugins: []
};
