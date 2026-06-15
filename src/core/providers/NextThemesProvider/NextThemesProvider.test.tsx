import { render, screen } from '@testing-library/react'
import { NextThemesProvider } from './NextThemesProvider'

vi.mock('next-themes', () => ({
    ThemeProvider: ({ children }: { children: React.ReactNode }) => (
        <div>{children}</div>
    ),
}))

describe('Providers: NextThemesProvider', () => {
    it('should render the children inside provider', () => {
        render(
            <NextThemesProvider>
                <div>Hello</div>
            </NextThemesProvider>,
        )

        expect(screen.getByText('Hello')).toBeInTheDocument()
    })
})
