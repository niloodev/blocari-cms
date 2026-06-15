import dynamic from 'next/dynamic'
import { ThemeToggleLoading } from './ThemeToggle.loading'

export const ThemeToggle = dynamic(
    () => import('./ThemeToggle').then(mod => mod.ThemeToggle),
    {
        ssr: false,
        loading: () => <ThemeToggleLoading />,
    },
)
