module.exports = {
  content: ["./src/**/*.{ts,tsx}", "../../packages/ui/src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      transitionProperty: {
        height: "height",
        color: "color",
        spacing: "margin, padding",
      },
    },
  },
  plugins: [],
};
