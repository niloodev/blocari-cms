import type { Viewport } from 'next'
import { GlobalProviders } from '@/core/providers'
import { Poppins, Rubik, Lexend_Exa } from 'next/font/google'
import '@/core/assets/global.css'

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
}

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-poppins',
    display: 'swap',
})

const rubik = Rubik({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-rubik',
    display: 'swap',
})

const lexendExa = Lexend_Exa({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-lexend',
    display: 'swap',
})

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html
            lang="pt-BR"
            suppressHydrationWarning
            className={`${poppins.variable} ${rubik.variable} ${lexendExa.variable}`}
        >
            <body>
                <GlobalProviders>{children}</GlobalProviders>
            </body>
        </html>
    )
}
