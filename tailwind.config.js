/** @type {import('tailwindcss').Config} */
import scrollbar from 'tailwind-scrollbar'; // Importing the scrollbar plugin

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        // Custom responsive breakpoint
        sPhone: '300px', // Custom breakpoint for 300px
        mPhone: "400px",
        lPhone: "500px",
      },
    },
  },
  plugins: [
    scrollbar({ nocompatible: true }), // Using the imported scrollbar plugin
  ],
}
