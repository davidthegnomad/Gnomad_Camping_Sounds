/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'deep-forest': '#051a1a',
                'forest-dark': '#0a2d2d',
                'ember': '#ff6b35',
                'ember-glow': '#ff9f1c',
                'night-sky': '#0d1b2a',
            },
            fontFamily: {
                sans: ['Outfit', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
