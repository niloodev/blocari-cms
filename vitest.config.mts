import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { fileURLToPath } from 'node:url'

export default defineConfig({
    plugins: [tsconfigPaths(), react()],
    resolve: {
        // O tsconfig exclui os *.test.* (para o build do Next não checá-los),
        // então o vite-tsconfig-paths não aplica o alias @/ nesses arquivos.
        // Definimos o alias explicitamente para os testes resolverem.
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    test: {
        environment: 'jsdom',
        include: ['**/*.test.tsx', '**/*.test.ts'],
        setupFiles: ['./vitest.setup.ts'],
        globals: true,
        coverage: {
            include: ['src/**/*.{ts,tsx}'],
            exclude: [
                '**/node_modules/**',
                '.next/**',
                '**/sets/**',
                '**/app/**',
                '**/middleware.ts',
            ],
            provider: 'istanbul',
        },
    },
})
