import { render, screen } from '@testing-library/react'
import { PropertyTitle } from './PropertyTitle'

describe('Atoms: PropertyTitle', () => {
    it('should render correctly', () => {
        render(<PropertyTitle>Test</PropertyTitle>)

        expect(screen.getByText('Test')).toBeInTheDocument()
    })
})
