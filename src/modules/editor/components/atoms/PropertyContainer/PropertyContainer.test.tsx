import { render, screen } from '@testing-library/react'
import { PropertyContainer } from './PropertyContainer'

describe('Atoms: PropertyContainer', () => {
    it('should render correctly with label', () => {
        render(<PropertyContainer label="Test Label">Test</PropertyContainer>)

        expect(screen.getByText('Test')).toBeInTheDocument()
        expect(screen.getByText('Test Label')).toBeInTheDocument()
    })

    it('should render correctly without label', () => {
        render(<PropertyContainer>Test</PropertyContainer>)

        expect(screen.getByText('Test')).toBeInTheDocument()
        expect(screen.queryByText('Test Label')).not.toBeInTheDocument()
    })
})
