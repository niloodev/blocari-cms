import { render, screen } from '@testing-library/react'
import { StyledComponentsRegistry } from './StyledComponentsRegistry'
import { useServerInsertedHTML } from 'next/navigation'
import { Mock } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'

vi.mock('styled-components', () => ({
    ServerStyleSheet: class {
        getStyleElement = vi.fn()
        instance = {
            clearTag: vi.fn(),
        }
    },
    StyleSheetManager: ({ children }: { children: React.ReactNode }) => (
        <div>{children}</div>
    ),
}))

vi.mock('next/navigation', () => ({
    useServerInsertedHTML: vi.fn(),
}))

describe('Providers: StyledComponentsRegistry', () => {
    it('should render the children', () => {
        render(
            <StyledComponentsRegistry>
                <div>Hello</div>
            </StyledComponentsRegistry>,
        )

        expect(screen.getByText('Hello')).toBeInTheDocument()
    })

    it('should fire useServerInsertedHTML', () => {
        render(
            <StyledComponentsRegistry>
                <div>Hello</div>
            </StyledComponentsRegistry>,
        )

        expect(useServerInsertedHTML).toHaveBeenCalledWith(expect.any(Function))
    })

    it('useServerInsertedHTML should call clearTag', () => {
        render(
            <StyledComponentsRegistry>
                <div>Hello</div>
            </StyledComponentsRegistry>,
        )
        ;(useServerInsertedHTML as Mock).mock.calls[0][0]()

        expect(screen.getByText('Hello')).toBeInTheDocument()
    })

    it('should render children when window is undefined in SSR', () => {
        const originalWindow = window
        vi.stubGlobal('window', undefined)

        const data = renderToStaticMarkup(
            <StyledComponentsRegistry>
                <div>Hello</div>
            </StyledComponentsRegistry>,
        )

        expect(data).toBe('<div><div>Hello</div></div>')

        vi.stubGlobal('window', originalWindow)
    })
})
