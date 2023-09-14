/** @type {import('tailwindcss').Config} */
// tailwind.config.js
const {nextui} = require("@nextui-org/react");
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    
    "./layout/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
      'hero-pattern': "url('/public/assets/img2.png')",
    },
    screens: {
      'mobile': {'max': '639px'},
    },
  },
  },
  plugins: [nextui()],
}