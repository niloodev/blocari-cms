import '@/core/assets/admin.global.css'
import { AdminProviders } from '@/core/providers'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-poppins',
    display: 'swap',
})

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <AdminProviders>
            <div className={`${poppins.variable} contents`}>{children}</div>
        </AdminProviders>
    )
}
