import { heroui } from '@heroui/react'

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        fontFamily: {
            poppins: ['var(--font-poppins)'],
            rubik: ['var(--font-rubik)'],
            lexend: ['var(--font-lexend)'],
        },
    },
    darkMode: 'class',
    plugins: [
        heroui({
            themes: {
                light: {
                    colors: {
                        'primary': '#e55b5b',
                        'primary-50': '#fef2f2',
                        'primary-100': '#fde3e3',
                        'primary-200': '#fac5c5',
                        'primary-300': '#f4a0a0',
                        'primary-400': '#ec7b7b',
                        'primary-500': '#e55b5b',
                        'primary-600': '#d44444',
                        'primary-700': '#b23636',
                        'primary-800': '#902f2f',
                        'primary-900': '#762b2b',
                        'primary-950': '#401414',
                    },
                },
                dark: {
                    colors: {
                        'primary': '#ec7b7b',
                        'primary-50': '#401414',
                        'primary-100': '#762b2b',
                        'primary-200': '#902f2f',
                        'primary-300': '#b23636',
                        'primary-400': '#d44444',
                        'primary-500': '#e55b5b',
                        'primary-600': '#ec7b7b',
                        'primary-700': '#f4a0a0',
                        'primary-800': '#fac5c5',
                        'primary-900': '#fde3e3',
                        'primary-950': '#fef2f2',
                    },
                },
            },
        }),
    ],
}
