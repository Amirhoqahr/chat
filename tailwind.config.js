/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx,jsx}"],
  theme: {
    extend: {
      colors:{
        myBlue: "#0A32B3",
        myPink: "#BD365D",
        myYellow: "#FFDF00",
      },
      backgroundImage: {
        'pattern': "url('img/bg.jpg')",
      }
    },
  },
  plugins: [],
}