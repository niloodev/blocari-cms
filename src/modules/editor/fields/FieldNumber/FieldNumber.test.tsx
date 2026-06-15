import { render, screen } from '@testing-library/react'
import { FieldNumber } from './FieldNumber'
import { z } from 'zod'
import { fieldValidator } from '@/shared/tools'

vi.mock('@/shared/libs/heroui', () => ({
    NumberInput: ({ errorMessage }: { errorMessage: string }) => (
        <input type="number" data-error={errorMessage} />
    ),
}))

describe('Fields: FieldNumber', () => {
    it('should render correctly', () => {
        render(<FieldNumber />)

        expect(screen.getByRole('spinbutton')).toBeInTheDocument()
    })

    it('should have working validator', () => {
        render(<FieldNumber validator={fieldValidator(z.number().min(1))} />)

        expect(screen.getByRole('spinbutton')).toHaveAttribute('data-error')
    })
})
