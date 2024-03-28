/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      container:{
        screens:{
          '2xl': '1480px'
        },
        center:true
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

