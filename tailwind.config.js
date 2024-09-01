/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily:{
        inter:["Inter", "sans-serif"],
      },
      colors:{
        5:"#F1F2FF",
        25:"#DBDDEA",
        100:"#AFB2BF",
        200:"#999DDA",
        700:"#2C333F",
        800:"#161D29",
        900:"#000814",
        customBlue: '#233550',
      },
      blue:{
        100:"#47A5C5",
      },
      pink:{
        200:"#EF476F",
      },
      yellow:{
        50:"#FFD60A",
      },
    },
  },
  plugins: [],
};

