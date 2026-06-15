import { render, screen } from '@testing-library/react'
import { FieldColor } from './FieldColor'

describe('Fields: FieldColor', () => {
    it('should render correctly when color is provided', () => {
        render(<FieldColor value="#000000" />)

        expect(screen.getByTestId('color-picker-trigger')).toBeInTheDocument()
        expect(screen.getByTestId('color-picker-trigger')).toHaveStyle({
            backgroundColor: '#000000',
        })
    })

    it('should validate color when color is invalid', () => {
        render(<FieldColor value="invalid-color" />)

        expect(screen.getByText('Cor inválida')).toBeInTheDocument()
    })

    it('should have input with value when color is provided', () => {
        render(<FieldColor value="#000000" />)

        expect(screen.getByRole('textbox')).toHaveValue('#000000')
    })
})
