import { Button } from '@/shared/libs/heroui'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()

    return (
        <Button
            onPress={() =>
                setTheme(theme => (theme === 'dark' ? 'light' : 'dark'))
            }
            isIconOnly
            className="w-[70px] h-10 flex items-center justify-start bg-content2 rounded-full"
            aria-label="Toggle theme"
            data-theme={theme}
        >
            <div
                className={`w-10 h-10 flex items-center justify-center bg-content3 rounded-full transition-transform duration-300 ${
                    theme === 'dark' ? 'translate-x-0' : 'translate-x-[30px]'
                }`}
            >
                {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
            </div>
        </Button>
    )
}
