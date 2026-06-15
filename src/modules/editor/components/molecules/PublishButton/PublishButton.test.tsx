import { render, screen, act } from '@testing-library/react'
import { PublishButton } from './PublishButton'
import { usePuck } from '@measured/puck'
import { EditorStore } from '@/modules/editor/store/editorSlice/editorSlice.types'
import { useEditor } from '@/modules/editor/store'
import { usePageMutation } from '@/modules/editor/hooks'

vi.mock('@measured/puck', () => ({
    ...vi.importActual('@measured/puck'),
    usePuck: vi.fn(),
}))

vi.mock('@/modules/editor/hooks', () => ({
    usePageMutation: vi.fn(),
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

    vi.mocked(usePageMutation).mockReturnValue({
        mutate: vi.fn(),
        isLoading: false,
    })
})

describe('Molecules: PublishButton', () => {
    it('should render correctly as publish button', () => {
        render(<PublishButton />)

        expect(screen.getByText('Publicar')).toBeInTheDocument()
    })

    it('should render correctly as update button', () => {
        vi.mocked(useEditor).mockReturnValue({
            publishedData: {
                _id: '123',
            },
        } as unknown as EditorStore)

        render(<PublishButton />)

        expect(screen.getByText('Atualizar')).toBeInTheDocument()
    })

    it('should render correctly as loading button', () => {
        vi.mocked(usePageMutation).mockReturnValue({
            mutate: vi.fn(),
            isLoading: true,
        })

        render(<PublishButton />)

        const button = screen.getByRole('button')

        expect(button).toHaveAttribute('data-loading', 'true')
    })

    it('should call mutate when button is clicked', () => {
        const { mutate } = usePageMutation({
            mutationType: 'create',
        })

        render(<PublishButton />)

        const button = screen.getByRole('button')

        act(() => {
            button.click()
        })

        expect(mutate).toHaveBeenCalledWith({
            data: {
                root: {
                    props: {
                        slug: '/test',
                    },
                },
                content: [],
            },
        })
    })
})
