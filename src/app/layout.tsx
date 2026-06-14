import type { Metadata, Viewport } from 'next'
import { GlobalProviders } from '@/core/providers'
export const metadata: Metadata = {
    title: {
        default: 'CMS',
        template: '%s | CMS',
    },
    description: 'CMS moderno e flexível construído com Next.js',
    applicationName: 'CMS',
    authors: [
        {
            name: 'Codako',
            url: 'https://codako.com.br',
        },
    ],
    generator: 'Next.js',
    keywords: [
        'cms',
        'nextjs',
        'react',
        'typescript',
        'gerenciador de conteúdo',
        'dashboard',
        'admin',
        'codako',
    ],
    referrer: 'origin-when-cross-origin',
    creator: 'Codako',
    publisher: 'Codako',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL('https://codako.com.br'),
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: 'CMS',
        description: 'CMS moderno e flexível construído com Next.js',
        url: 'https://codako.com.br',
        siteName: 'CMS',
        locale: 'pt_BR',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'CMS',
        description: 'CMS moderno e flexível construído com Next.js',
        creator: '@codako',
    },
    verification: {
        google: 'google-site-verification-code',
        other: {
            'msvalidate.01': 'microsoft-site-verification-code',
        },
    },
    category: 'technology',
    classification: 'Content Management System',
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="pt-BR">
            <body>
                <GlobalProviders>{children}</GlobalProviders>
            </body>
        </html>
    )
}
