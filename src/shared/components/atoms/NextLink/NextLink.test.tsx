import { render, screen } from '@testing-library/react'
import { NextLink } from './'
import { usePuck } from '@measured/puck'

vi.mock('@measured/puck', () => ({
    usePuck: vi.fn(),
}))

describe('Atoms: NextLink', () => {
    it('should render span when puck is available', () => {
        render(<NextLink href="/">Test</NextLink>)

        expect(screen.queryByRole('link')).not.toBeInTheDocument()
    })

    it('should render error when puck is not available', () => {
        vi.mocked(usePuck).mockImplementation(() => {
            throw new Error('Puck is not available')
        })

        render(<NextLink href="/">Test</NextLink>)

        expect(screen.queryByRole('link')).toBeInTheDocument()
    })
})
