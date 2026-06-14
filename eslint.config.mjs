import { FlatCompat } from '@eslint/eslintrc'
import eslintConfigPrettier from 'eslint-config-prettier'

const compat = new FlatCompat({
    baseDirectory: import.meta.dirname,
})

const eslintConfig = [
    ...compat.config({
        extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
    }),
    eslintConfigPrettier,
    {
        rules: {
            'react/display-name': 'off',
            '@typescript-eslint/naming-convention': [
                'error',
                // { selector: 'variable', format: ['camelCase'] },
                { selector: 'typeLike', format: ['PascalCase'] },
                {
                    selector: 'typeParameter',
                    format: ['PascalCase'],
                    prefix: ['T'],
                },

                {
                    selector: 'interface',
                    format: ['PascalCase'],
                },
            ],
        },
    },
]

export default eslintConfig
