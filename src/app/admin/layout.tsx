import { AdminProviders } from '@/core/providers'
import { Metadata } from 'next'
import '@/core/assets/admin.global.css'

export const metadata: Metadata = {
    title: {
        default: 'Blocari CMS',
        template: '%s | Blocari CMS',
    },
    description: 'CMS moderno e flexível construído com Next.js',
    applicationName: 'Blocari CMS',
    authors: [
        {
            name: 'Blocari',
            url: 'https://blocari.com.br',
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
        'blocari',
    ],
    referrer: 'origin-when-cross-origin',
    creator: 'Blocari',
    publisher: 'Blocari',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL('https://blocari.com.br'),
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: 'Blocari CMS',
        description: 'CMS moderno e flexível construído com Next.js',
        url: 'https://blocari.com.br',
        siteName: 'Blocari CMS',
        locale: 'pt_BR',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Blocari CMS',
        description: 'CMS moderno e flexível construído com Next.js',
        creator: '@blocari',
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

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <AdminProviders>
            <div className="max-w-full max-h-full bg-background">
                {children}
            </div>
        </AdminProviders>
    )
}
