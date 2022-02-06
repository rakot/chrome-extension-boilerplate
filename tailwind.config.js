module.exports = {
  content: ["./source/inject/**/*.{html,js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
}