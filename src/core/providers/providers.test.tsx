import { render, screen } from '@testing-library/react'
import { GlobalProviders, AdminProviders } from './providers'

vi.mock('next-themes', () => ({
    ThemeProvider: ({ children }: { children: React.ReactNode }) => (
        <div>{children}</div>
    ),
}))

describe('Providers', () => {
    it('should render children on GlobalProviders', () => {
        render(<GlobalProviders>Test</GlobalProviders>)
        expect(screen.getByText('Test')).toBeInTheDocument()
    })

    it('should render children on AdminProviders', () => {
        render(<AdminProviders>Test</AdminProviders>)
        expect(screen.getByText('Test')).toBeInTheDocument()
    })
})
