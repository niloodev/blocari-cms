import { render, screen } from '@testing-library/react'
import { OutlineMenu } from './OutlineMenu'

vi.mock('@measured/puck', () => ({
    Puck: {
        Outline: () => <div>Outline</div>,
    },
}))

describe('Menus: OutlineMenu', () => {
    it('should render correctly', () => {
        render(<OutlineMenu />)

        expect(screen.getByText('Outline')).toBeInTheDocument()
        expect(screen.getByText('Visão Geral')).toBeInTheDocument()
    })
})
