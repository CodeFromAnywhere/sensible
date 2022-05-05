const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  plugins: [require("nightwind"), require("@tailwindcss/line-clamp")],
  theme: {
    extend: {
      animation: {
        "pulse-bg-once": "pulse-bg-once 2s ease-in forwards",
        "spin-slow": "spin 10s linear infinite",
      },
      keyframes: {
        "pulse-bg-once": {
          to: { backgroundColor: "transparent" },
        },
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
