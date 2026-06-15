import { render, screen } from '@testing-library/react'
import { Header } from './Header'
import { headerHeight } from './Header.constants'

vi.mock('@/modules/editor/components/molecules', () => ({
    PageStatus: vi.fn(),
    ViewportButtons: vi.fn(),
    PublishButton: vi.fn(),
    DynamicRouteHelper: vi.fn(),
}))

vi.mock('@/core/components/molecules', () => ({
    ThemeToggle: vi.fn(),
}))

describe('Organisms: Header', () => {
    it('should render correctly', () => {
        render(<Header />)

        expect(screen.getByText('Voltar')).toBeInTheDocument()
    })

    it('should render height correctly', () => {
        render(<Header />)

        expect(screen.getByRole('banner')).toHaveStyle(
            `height: ${headerHeight}`,
        )
    })
})
