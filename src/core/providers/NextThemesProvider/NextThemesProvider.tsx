import { ThemeProvider } from 'next-themes'
import { defaultTheme } from './NextThemesProvider.constants'

export function NextThemesProvider({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ThemeProvider attribute="class" defaultTheme={defaultTheme}>
            {children}
        </ThemeProvider>
    )
}
