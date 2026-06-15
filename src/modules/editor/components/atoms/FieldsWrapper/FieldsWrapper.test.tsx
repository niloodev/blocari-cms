import { render, screen } from '@testing-library/react'
import { FieldsWrapper } from './'

describe('Atoms: FieldsWrapper', () => {
    it('should render correctly', () => {
        render(<FieldsWrapper>Test</FieldsWrapper>)

        expect(screen.getByText('Test')).toBeInTheDocument()
    })
})
