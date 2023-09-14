/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'black': {
          500: '#1D1F2C',
          400: '#4A4C56'
        },
        'gray': {
          85: '#858D9D',
          66: '#667085'
        }

      }
    },
    variants: {
      extend: {
        display: [ "group-hover" ],
        margin: [ "group-hover" ],
        visibility: [ "group-hover" ]
      }
    }
  },
  plugins: [],
}

