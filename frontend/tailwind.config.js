/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        base: ['0.875rem', { lineHeight: '1.25rem' }], // 14px base font size
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};