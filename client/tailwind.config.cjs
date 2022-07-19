/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{jsx, js}'],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '320px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },
    colors: {
      DEFAULT: '#243747',
      'team-dark': '#243747',
      'team-blue': '#36A1FF',
      'team-brown': '#D6B935',
      'team-green': '#5CE706',
      white: '#FFFF',
      purple: '#7e5bef',
      pink: '#ff49db',
      orange: '#ff7849',
      green: '#13ce66',
      yellow: '#ffc82c',
      'gray-dark': '#273444',
      gray: '#8492a6',
      'gray-light': '#d3dce6'
    },
    fontFamily: {
      sans: ['Inter var', 'Graphik', 'sans-serif']
    },
    extend: {
      gridTemplateColumns: {
        main: '375px minmax(900px, 1fr) 100px'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
}
