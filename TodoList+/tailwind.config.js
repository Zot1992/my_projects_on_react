/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{html,js,jsx,vue}',
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('tailwind-scrollbar')
    ],
}