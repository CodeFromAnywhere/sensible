const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  plugins: [require("nightwind"), require("@tailwindcss/line-clamp")],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 10s linear infinite",
      },
      colors: {
        blueish: colors.blue["500"],
        greenish: colors.green["500"],
        grayish: colors.gray["200"],
      },

      transitionProperty: {
        height: "height",
        "max-height": "max-h",
        "min-height": "min-h",
      },
    },
  },
};
