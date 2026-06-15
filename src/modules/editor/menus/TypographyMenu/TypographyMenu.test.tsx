import { render, screen } from '@testing-library/react'
import { TypographyMenu } from './TypographyMenu'

describe('Menus: TypographyMenu', () => {
    it('should render correctly', () => {
        render(<TypographyMenu />)

        expect(screen.getByText('Tipografia')).toBeInTheDocument()
    })
})
