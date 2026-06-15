import { render, screen } from '@testing-library/react'
import { PropertyComponentHeader } from './PropertyComponentHeader'
import { usePuck } from '@measured/puck'

vi.mock('@measured/puck', async importOriginal => {
    const actual = await importOriginal<typeof import('@measured/puck')>()
    return {
        ...actual,
        usePuck: vi.fn(),
    }
})

vi.mock('@/sets', () => ({
    sets: {
        wrapper: {
            label: 'Wrapper',
        },
        text: {
            label: 'Texto',
        },
    },
}))

beforeEach(() => {
    vi.clearAllMocks()

    vi.mocked(usePuck).mockReturnValue({
        appState: {
            ui: { itemSelector: null },
            data: {
                content: [],
                zones: {},
            },
        },
    } as unknown as ReturnType<typeof usePuck>)
})

describe('ComponentsProperties: PropertyComponentHeader', () => {
    it('should render correctly when don`t have component selected', () => {
        render(<PropertyComponentHeader />)

        expect(screen.getByText('Página')).toBeInTheDocument()
    })

    it('should render correctly when have component selected', () => {
        vi.mocked(usePuck).mockReturnValue({
            appState: {
                ui: {
                    itemSelector: {
                        zone: 'default-zone',
                        index: 0,
                    },
                },
                data: {
                    content: [
                        {
                            type: 'text',
                            props: {},
                        },
                    ],
                },
            },
        } as unknown as ReturnType<typeof usePuck>)

        render(<PropertyComponentHeader />)

        expect(screen.getByText('Página')).toBeInTheDocument()
        expect(screen.getByText('Texto')).toBeInTheDocument()
    })

    it('should render correctly when have component selected in a zone', () => {
        vi.mocked(usePuck).mockReturnValue({
            appState: {
                ui: { itemSelector: { zone: 'wrapper-zone-1', index: 0 } },
                data: {
                    content: [
                        {
                            type: 'wrapper',
                            props: {},
                        },
                    ],
                    zones: {
                        'wrapper-zone-1': [
                            {
                                type: 'text',
                                props: {},
                            },
                        ],
                    },
                },
            },
        } as unknown as ReturnType<typeof usePuck>)

        render(<PropertyComponentHeader />)

        expect(screen.getByText('Wrapper')).toBeInTheDocument()
        expect(screen.getByText('Texto')).toBeInTheDocument()
    })

    it('should fallback to default zone when zone is not found', () => {
        vi.mocked(usePuck).mockReturnValue({
            appState: {
                ui: { itemSelector: { index: 0 } },
                data: {
                    content: [
                        {
                            type: 'text',
                            props: {},
                        },
                    ],
                    zones: {},
                },
            },
        } as unknown as ReturnType<typeof usePuck>)

        render(<PropertyComponentHeader />)

        expect(screen.getByText('Página')).toBeInTheDocument()
        expect(screen.getByText('Texto')).toBeInTheDocument()
    })

    it('should fallback zone label when zone doesn`t have a label', () => {
        vi.mocked(usePuck).mockReturnValue({
            appState: {
                ui: { itemSelector: { zone: 'non-existent-zone', index: 0 } },
                data: {
                    zones: {
                        'non-existent-zone': [{ type: 'text', props: {} }],
                    },
                    content: [],
                },
            },
        } as unknown as ReturnType<typeof usePuck>)

        render(<PropertyComponentHeader />)

        expect(screen.getByText('Página')).toBeInTheDocument()
        expect(screen.getByText('Texto')).toBeInTheDocument()
    })

    it('should use component key as label when component doesn`t have a label', () => {
        vi.mocked(usePuck).mockReturnValue({
            appState: {
                ui: { itemSelector: { zone: 'default-zone', index: 0 } },
                data: {
                    content: [{ type: 'non-existent-component', props: {} }],
                },
            },
        } as unknown as ReturnType<typeof usePuck>)

        render(<PropertyComponentHeader />)

        expect(screen.getByText('Página')).toBeInTheDocument()
        expect(screen.getByText('non-existent-component')).toBeInTheDocument()
    })
})
