import { render, screen } from '@testing-library/react'
import { ComponentsWrapper } from './'

describe('Atoms: ComponentsWrapper', () => {
    it('should render correctly', () => {
        render(<ComponentsWrapper>Test</ComponentsWrapper>)

        expect(screen.getByText('Test')).toBeInTheDocument()
    })
})
