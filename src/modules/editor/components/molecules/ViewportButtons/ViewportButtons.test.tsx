import { render, screen } from '@testing-library/react'
import { ViewportButtons } from './ViewportButtons'
import { usePuck } from '@measured/puck'
import { viewports } from '@/modules/editor/editor.constants'
import { act } from 'react'

vi.mock('@measured/puck', () => ({
    ...vi.importActual('@measured/puck'),
    usePuck: vi.fn(),
}))

beforeEach(() => {
    vi.clearAllMocks()

    vi.mocked(usePuck).mockReturnValue({
        appState: {
            ui: {
                viewports: {
                    current: {
                        width: viewports[0].width,
                        height: viewports[0].height ?? 'auto',
                    },
                },
            },
        },
        dispatch: vi.fn(),
    } as unknown as ReturnType<typeof usePuck>)
})

describe('Molecules: ViewportButtons', () => {
    it('should render correctly with the first viewport selected', () => {
        render(<ViewportButtons />)

        const button = screen.getByRole('button', { name: viewports[0].label })

        expect(button).toBeInTheDocument()
        expect(button).toHaveClass('bg-primary-100 text-primary')
    })

    it('should render corner buttons correctly', () => {
        render(<ViewportButtons />)

        const firstButton = screen.getByRole('button', {
            name: viewports[0].label,
        })
        const lastButton = screen.getByRole('button', {
            name: viewports[viewports.length - 1].label,
        })

        expect(firstButton).toHaveClass('rounded-tr-none rounded-br-none')
        expect(lastButton).toHaveClass('rounded-tl-none rounded-bl-none')
    })

    it('should render middle buttons correctly', () => {
        render(<ViewportButtons />)

        const middleButton = screen.getByRole('button', {
            name: viewports[1].label,
        })

        expect(middleButton).toHaveClass('rounded-none')
    })

    it('should call defineViewport when button is clicked', () => {
        const { dispatch } = usePuck()

        render(<ViewportButtons />)

        const button = screen.getByRole('button', { name: viewports[0].label })

        act(() => button.click())

        expect(dispatch).toHaveBeenCalledWith({
            type: 'setUi',
            ui: {
                viewports: {
                    current: {
                        width: viewports[0].width,
                        height: viewports[0].height,
                    },
                    controlsVisible: true,
                    options: [],
                },
            },
        })
    })

    it('should fallback to height auto when height is not defined', () => {
        vi.mocked(viewports[0]).height = undefined

        const { dispatch } = usePuck()

        render(<ViewportButtons />)

        const button = screen.getByRole('button', { name: viewports[0].label })

        act(() => button.click())

        expect(dispatch).toHaveBeenCalledWith({
            type: 'setUi',
            ui: {
                viewports: {
                    current: {
                        width: viewports[0].width,
                        height: 'auto',
                    },
                    controlsVisible: true,
                    options: [],
                },
            },
        })
    })
})
