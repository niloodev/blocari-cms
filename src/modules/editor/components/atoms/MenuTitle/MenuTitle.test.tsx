import { render, screen } from '@testing-library/react'
import { MenuTitle } from './'

describe('Atoms: MenuTitle', () => {
    it('should render correctly', () => {
        render(<MenuTitle>Test</MenuTitle>)

        expect(screen.getByText('Test')).toBeInTheDocument()
    })
})
