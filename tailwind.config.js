const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');
const formsPlugin = require('@tailwindcss/forms');
const typographyPlugin = require('@tailwindcss/typography');
const lineClampPlugin = require('@tailwindcss/line-clamp');
const aspectRatioPlugin = require('@tailwindcss/aspect-ratio');

module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter var"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        sky: colors.sky,
        'blue-gray': colors.blueGray,
      },
    },
  },
  plugins: [
    formsPlugin,
    typographyPlugin,
    lineClampPlugin,
    aspectRatioPlugin,
  ],
};
