import { act, render, screen } from '@testing-library/react'
import { ThemeToggle } from './ThemeToggle'
import { ThemeToggle as LazyThemeToggle } from './'
import { useTheme } from 'next-themes'
import { useState } from 'react'

vi.mock('next-themes', () => ({
    useTheme: vi.fn(),
}))

beforeEach(() => {
    vi.clearAllMocks()

    vi.mocked(useTheme).mockReturnValue({
        theme: 'light',
        setTheme: vi.fn(),
        themes: ['light', 'dark'],
    })
})

describe('Molecules: ThemeToggle', () => {
    it('should render with default theme', () => {
        render(<ThemeToggle />)

        expect(screen.getByLabelText('Toggle theme')).toBeInTheDocument()
        expect(screen.getByLabelText('Toggle theme')).toHaveAttribute(
            'data-theme',
            'light',
        )
    })

    it('should render with dark theme', () => {
        vi.mocked(useTheme).mockImplementation(() => ({
            theme: 'dark',
            setTheme: vi.fn(),
            themes: ['light', 'dark'],
        }))

        render(<ThemeToggle />)

        expect(screen.getByLabelText('Toggle theme')).toHaveAttribute(
            'data-theme',
            'dark',
        )
    })

    it('should toggle theme when clicked', () => {
        vi.mocked(useTheme).mockImplementation(() => {
            const [theme, setTheme] = useState('light')

            return {
                theme,
                setTheme,
                themes: ['light', 'dark'],
            }
        })

        render(<ThemeToggle />)

        const button = screen.getByLabelText('Toggle theme')

        act(() => {
            button.click()
        })

        expect(button).toHaveAttribute('data-theme', 'dark')

        act(() => {
            button.click()
        })

        expect(button).toHaveAttribute('data-theme', 'light')
    })

    it('should work with lazy loading', () => {
        render(<LazyThemeToggle />)

        expect(screen.getByTestId('theme-toggle-loading')).toBeInTheDocument()
    })
})
