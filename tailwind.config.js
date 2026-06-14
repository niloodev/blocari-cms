import { heroui } from '@heroui/react'

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                'primary': '#00CE8B',
                'primary-100': '#E0F7EF',
                'primary-200': '#B2EFD9',
                'primary-300': '#80E4C3',
                'primary-400': '#4FD9AD',
                'primary-500': '#00CE8B',
                'primary-600': '#00B97D',
                'primary-700': '#009A6A',
                'primary-800': '#007B57',
                'primary-900': '#005D44',
            },
        },
        fontFamily: {
            poppins: ['var(--font-poppins)'],
        },
    },
    darkMode: 'class',
    plugins: [heroui()],
}
