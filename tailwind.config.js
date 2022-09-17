/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'color-primary': 'var(--color-primary)',
        'color-secondary': 'var(--color-secondary)',
        'color-warn': 'var(--color-warn)',
        'color-danger': 'var(--color-danger)',
        'color-info': 'var(--color-info)',
        'color-success': 'var(--color-success)'
      }
    }
  },
  plugins: [require('postcss-import')]
};
