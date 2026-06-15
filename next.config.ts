import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    output: process.env.TYPE === 'standalone' ? undefined : 'standalone',
    compiler: {
        styledComponents: true,
    },
    images: {
        // Editores podem inserir imagens de qualquer origem (ex: placehold.co),
        // então liberamos hosts http/https para o otimizador do next/image.
        // Para um ambiente mais restrito, troque por hostnames específicos.
        remotePatterns: [
            { protocol: 'https', hostname: '**' },
            { protocol: 'http', hostname: '**' },
        ],
        // Permite que o otimizador sirva SVGs (ex: placehold.co retorna image/svg+xml).
        // O CSP abaixo evita execução de scripts embutidos no SVG.
        dangerouslyAllowSVG: true,
        contentDispositionType: 'attachment',
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
    experimental: {
        serverActions: {
            // Imagens são salvas no Mongo via Server Actions, então o payload
            // pode ultrapassar o limite padrão de 1 MB.
            bodySizeLimit: '20mb',
        },
    },
}

export default nextConfig
