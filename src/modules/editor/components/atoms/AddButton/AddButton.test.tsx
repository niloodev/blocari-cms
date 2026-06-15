import { AddButton } from './AddButton'
import { render, screen } from '@testing-library/react'

describe('Atoms: AddButton', () => {
    it('should render correctly', () => {
        render(<AddButton />)
        expect(screen.getByRole('button')).toBeInTheDocument()
    })
})
