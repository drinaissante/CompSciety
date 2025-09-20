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
      transformOrigin: {
        top: "top",
      },
      scale: {
        0: "0",
        100: "1",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        "gradient-x": "gradient-x 3s ease infinite",
      },
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
      },
    },
  },
  plugins: [],
};
