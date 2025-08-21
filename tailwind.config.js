// tailwind.config.js
module.exports = {
  content: [
    "./index.html", // include Vite HTML entry
    "./src/**/*.{js,ts,jsx,tsx}", // scan all files in src
  ],
  theme: {
    extend: {
      screens: {
        xs: "480px", // Add xs breakpoint
      },
    },
  },
  plugins: [],
};
