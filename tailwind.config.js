/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'platinum': "#e2e9e8",
        'tiffany': {
          100: "hsl(174, 50%, 96%)", 
          200: "hsl(174, 50%, 91%)", 
          300: "hsl(174, 50%, 86%)", 
          400: "hsl(174, 50%, 81%)", 
          500: "hsl(174, 50%, 76%)", 
          600: "hsl(174, 50%, 61%)", 
          700: "hsl(174, 50%, 46%)", 
          800: "hsl(174, 50%, 31%)", 
          900: "hsl(174, 50%, 16%)", 
        },
        'tangerine': {
          100: "hsl(30, 100%, 95%)",
          200: "hsl(30, 100%, 90%)",
          300: "hsl(30, 100%, 85%)",
          400: "hsl(30, 100%, 80%)",
          500: "hsl(30, 100%, 75%)",
          600: "hsl(30, 80%, 62%)",
          700: "hsl(30, 54%, 53%)",
          800: "hsl(30, 20%, 30%)",
          900: "hsl(30, 10%, 15%)",
        },
        'dark-blue': {
          1: '#3d5a7f',
          2: '#283a53',
          3: '#141d29'
        },
      },
      fontFamily:{
        pregular: ['Poppins-Regular', 'sans-serif'],
        pbold: ['Poppins-Bold', 'sans-serif'],
        pmedium: ['Poppins-Medium', 'sans-serif'],
        psemi: ['Poppins-SemiBold', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

