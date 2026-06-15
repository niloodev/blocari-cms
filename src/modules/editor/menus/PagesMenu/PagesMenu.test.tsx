import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { PagesMenu } from './PagesMenu'
import { PagesMenu as PagesMenuWithHOC } from './'
import { Data, usePuck } from '@measured/puck'
import { EditorStore } from '@/modules/editor/store/editorSlice/editorSlice.types'
import { useEditor, useEditorRouter } from '@/modules/editor/store'
import { getPages } from '@/core/controllers/pages'

vi.mock('@measured/puck', () => ({
    ...vi.importActual('@measured/puck'),
    DropZone: () => <></>,
    usePuck: vi.fn(),
}))

vi.mock('@/modules/editor/components/atoms', () => ({
    ImageButton: ({ name, onPress }: { name: string; onPress: () => void }) => (
        <button aria-label={name} onClick={onPress}>
            {name}
        </button>
    ),
    MenuTitle: ({ children }: { children: React.ReactNode }) => (
        <div>{children}</div>
    ),
    AddButton: ({ onPress }: { onPress: () => void }) => (
        <button aria-label="Adicionar página" onClick={onPress}>
            Adicionar página
        </button>
    ),
}))

vi.mock('@/modules/editor/store', () => ({
    useEditor: vi.fn(),
    useEditorRouter: vi.fn(),
}))

vi.mock('@/core/controllers/pages', () => ({
    getPages: vi.fn(),
}))

const pages = [
    {
        _id: '1',
        title: 'Test',
        slug: '/test',
        content: {} as Data,
        dynamicAdaptor: 'products' as const,
    },
    {
        _id: '2',
        title: 'Test 2',
        slug: '/test2',
        content: {} as Data,
        dynamicAdaptor: 'categories' as const,
    },
    {
        _id: '3',
        title: 'Test 3',
        slug: '/test3',
        content: {} as Data,
        dynamicAdaptor: 'users' as const,
    },
]

beforeEach(() => {
    vi.clearAllMocks()

    vi.mocked(usePuck).mockReturnValue({
        dispatch: vi.fn(),
    } as unknown as ReturnType<typeof usePuck>)

    vi.mocked(useEditor).mockReturnValue({
        publishedData: {
            _id: '1',
            title: 'Test',
            slug: '/test',
            content: {} as Data,
            dynamicAdaptor: '',
        },
    } as unknown as EditorStore)

    vi.mocked(useEditorRouter).mockReturnValue({
        push: vi.fn(),
    } as unknown as ReturnType<typeof useEditorRouter>)

    vi.mocked(getPages).mockImplementation(
        () =>
            new Promise(resolve => {
                resolve({
                    status: 'success',
                    payload: pages,
                    message: 'success',
                })
            }),
    )
})

describe('Menus: PagesMenu', async () => {
    it('should render pages correctly', async () => {
        render(<PagesMenu />)

        expect(screen.getByText('Páginas')).toBeInTheDocument()

        await waitFor(() => {
            pages.forEach(page => {
                expect(screen.getByText(page.title)).toBeInTheDocument()
            })
        })
    })

    it('should render loading state', () => {
        render(<PagesMenu />)

        expect(
            screen.getByTestId('pages-menu-loading-spinner'),
        ).toBeInTheDocument()
    })

    it('should call handleSelectPage when add button is clicked', async () => {
        const { push } = useEditorRouter()

        render(<PagesMenu />)

        const addButton = screen.getByLabelText('Adicionar página')

        act(() => {
            fireEvent.click(addButton)
        })

        expect(push).toHaveBeenCalledWith('/admin/editor')
    })

    it('should call handleSelectPage when page selected', async () => {
        const { push } = useEditorRouter()
        const { dispatch } = usePuck()

        render(<PagesMenu />)

        await waitFor(() => {
            pages.forEach(page => {
                expect(screen.getByText(page.title)).toBeInTheDocument()
            })
        })

        const page = screen.getByLabelText(pages[0].title)

        act(() => {
            fireEvent.click(page)
        })

        await waitFor(() => {
            expect(push).toHaveBeenCalledWith(
                `/admin/editor?id=${pages[0]._id}`,
            )
            expect(dispatch).toHaveBeenCalledWith({
                type: 'setUi',
                ui: {
                    itemSelector: null,
                },
            })
        })
    })

    it('should render error state', async () => {
        vi.mocked(getPages).mockImplementation(
            () =>
                new Promise(resolve => {
                    resolve({
                        status: 'error',
                        error: 'Dados da página inválidos',
                    })
                }),
        )

        render(<PagesMenuWithHOC />)

        await waitFor(() => {
            expect(screen.getByTestId('pages-menu-error')).toBeInTheDocument()
        })
    })

    it('should render loading state when HOC is used', () => {
        render(<PagesMenuWithHOC />)

        expect(
            screen.getByTestId('pages-menu-loading-spinner'),
        ).toBeInTheDocument()
    })
})
