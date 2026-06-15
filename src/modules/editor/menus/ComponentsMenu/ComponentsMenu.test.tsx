import { render, screen } from '@testing-library/react'
import { ComponentsMenu } from './ComponentsMenu'

vi.mock('@measured/puck', () => ({
    Puck: {
        Components: () => <div>Puck Components</div>,
    },
}))

beforeEach(() => {
    vi.clearAllMocks()
})

describe('Menus: ComponentsMenu', () => {
    it('should render correctly', () => {
        render(<ComponentsMenu />)

        expect(screen.getByText('Componentes')).toBeInTheDocument()
        expect(screen.getByText('Puck Components')).toBeInTheDocument()
    })
})
