import { render, screen } from '@testing-library/react'
import { ViewportStyledInjection } from './ViewportStyledInjection'

describe('Molecules: ViewportStyledInjection', () => {
    it('should render children correctly', () => {
        render(
            <ViewportStyledInjection>
                <div>Test</div>
            </ViewportStyledInjection>,
        )

        expect(screen.getByText('Test')).toBeInTheDocument()
    })

    it('should inject background color correctly', () => {
        const document = window.document

        render(
            <ViewportStyledInjection document={document}>
                <div>Test</div>
            </ViewportStyledInjection>,
        )

        expect(document.querySelector('style')).toBeInTheDocument()
        expect(document.querySelector('style')?.innerHTML).toMatch(
            /background-color: #FFF !important;/,
        )
    })
})
