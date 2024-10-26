/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter'],
      },
      colors: {
        customBlack: '#1A1A1A',
        customWhite: '#FEF4F4',
        customLightPurple: '#8E43ED',
        customDarkPurple: '#512687',
        customLightYellow: '#F0EC8B',
        customDarkGrey: '#323232',
      },
    },
  },
  plugins: [],
};
