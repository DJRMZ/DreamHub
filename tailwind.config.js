const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "index.js",
    "./src/**/*.{js,jsx}",
    "./screens/**/*.{js,jsx}",
    "./pages/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ["Comic Sans", ...defaultTheme.fontFamily.sans],
      },
    },
  },
};
