import { render, screen, waitFor } from '@testing-library/react'
import { PageStatus } from './PageStatus'
import { PageStatus as PageStatusLazy } from './index'
import { EditorStore } from '@/modules/editor/store/editorSlice/editorSlice.types'
import { useEditor } from '@/modules/editor/store'
import { usePuck } from '@measured/puck'

vi.mock('@measured/puck', () => ({
    ...vi.importActual('@measured/puck'),
    usePuck: vi.fn(),
}))

vi.mock('@/modules/editor/store', () => ({
    useEditor: vi.fn(),
}))

beforeEach(() => {
    vi.clearAllMocks()

    vi.mocked(useEditor).mockReturnValue({
        publishedData: {},
        isLoading: false,
    } as unknown as EditorStore)

    vi.mocked(usePuck).mockReturnValue({
        appState: {
            data: {
                root: {
                    props: {
                        slug: '/test',
                    },
                },
                content: [],
            },
        },
    } as unknown as ReturnType<typeof usePuck>)
})

describe('Molecules: PageStatus', () => {
    it('should render correctly with draft status', () => {
        render(<PageStatus />)

        expect(screen.getByText('Sem título')).toBeInTheDocument()
        expect(screen.getByText('Rascunho')).toBeInTheDocument()
    })

    it('should render correctly with published status', () => {
        vi.mocked(useEditor).mockReturnValue({
            publishedData: {
                _id: '123',
                title: 'Test',
                slug: '/test',
                content: {
                    root: {
                        props: {
                            title: 'Test',
                            slug: '/test',
                        },
                    },
                },
            },
        } as unknown as EditorStore)

        vi.mocked(usePuck).mockReturnValue({
            appState: {
                data: {
                    root: {
                        props: {
                            title: 'Test',
                            slug: '/test',
                        },
                    },
                    content: [],
                },
            },
        } as unknown as ReturnType<typeof usePuck>)

        render(<PageStatus />)

        expect(screen.getByText('Test')).toBeInTheDocument()
        expect(screen.getByText('Publicado')).toBeInTheDocument()
    })

    it('should render correctly with loading status', () => {
        vi.mocked(useEditor).mockReturnValue({
            publishedData: {},
            isLoading: true,
        } as unknown as EditorStore)

        render(<PageStatus />)

        expect(screen.getByTestId('page-status-loading')).toBeInTheDocument()
    })

    it('should render draft when different from published', () => {
        vi.mocked(useEditor).mockReturnValue({
            publishedData: {
                _id: '123',
                title: 'Test',
                slug: '/test',
                content: {
                    root: {
                        props: {
                            title: 'Test',
                            slug: '/test',
                        },
                    },
                    zones: false,
                },
            },
        } as unknown as EditorStore)

        vi.mocked(usePuck).mockReturnValue({
            appState: {
                data: {
                    root: {
                        props: {
                            title: 'Test Edited',
                            slug: '/test',
                        },
                    },
                    content: [],
                    zones: false,
                },
            },
        } as unknown as ReturnType<typeof usePuck>)

        render(<PageStatus />)

        expect(screen.getByText('Test Edited')).toBeInTheDocument()
        expect(screen.getByText('Rascunho')).toBeInTheDocument()
    })

    it('should render correctly with lazy loading', async () => {
        render(<PageStatusLazy />)

        await waitFor(() => {
            expect(screen.getByText('Sem título')).toBeInTheDocument()
            expect(screen.getByText('Rascunho')).toBeInTheDocument()
        })
    })
})
