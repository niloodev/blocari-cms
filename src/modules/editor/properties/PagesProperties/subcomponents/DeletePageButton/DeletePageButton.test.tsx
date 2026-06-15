import { fireEvent, render, screen } from '@testing-library/react'
import { DeletePageButton } from '.'
import { useEditor } from '@/modules/editor/store'
import { EditorStore } from '@/modules/editor/store/editorSlice/editorSlice.types'
import { Data } from '@measured/puck'
import { usePageMutation } from '@/modules/editor/hooks'

vi.mock('@/modules/editor/hooks', () => ({
    usePageMutation: vi.fn(),
}))

vi.mock('@/modules/editor/store', () => ({
    useEditor: vi.fn(),
}))

beforeEach(() => {
    vi.clearAllMocks()

    vi.mocked(useEditor).mockReturnValue({
        publishedData: {
            _id: '123',
            title: 'Test',
            slug: 'test',
            content: {} as Data,
        },
    } as unknown as EditorStore)

    vi.mocked(usePageMutation).mockReturnValue({
        mutate: vi.fn(),
        isLoading: false,
    })
})

describe('PagesProperties: DeletePageButton', () => {
    it('should render correctly when pageId is not null', () => {
        render(<DeletePageButton />)

        expect(
            screen.getByRole('button', { name: 'Deletar' }),
        ).toBeInTheDocument()
    })

    it('should not render button when pageId is null', () => {
        vi.mocked(useEditor).mockReturnValue({
            publishedData: {},
        } as unknown as EditorStore)

        render(<DeletePageButton />)

        expect(
            screen.queryByRole('button', { name: 'Deletar' }),
        ).not.toBeInTheDocument()
    })

    it('should open modal when button is clicked', () => {
        render(<DeletePageButton />)

        fireEvent.click(screen.getByRole('button', { name: 'Deletar' }))

        expect(
            screen.getByText('Tem certeza que deseja deletar a página?'),
        ).toBeInTheDocument()
    })

    it('should close modal when cancel button is clicked', () => {
        render(<DeletePageButton />)

        fireEvent.click(screen.getByRole('button', { name: 'Deletar' }))
        fireEvent.click(screen.getByRole('button', { name: 'Cancelar' }))

        expect(
            screen.queryByText('Tem certeza que deseja deletar a página?'),
        ).not.toBeInTheDocument()
    })

    it('should call mutate when delete button is clicked', () => {
        vi.mocked(useEditor).mockReturnValue({
            publishedData: {
                _id: '123',
            },
        } as unknown as EditorStore)

        const { mutate } = usePageMutation({ mutationType: 'delete' })

        render(<DeletePageButton />)

        fireEvent.click(screen.getByRole('button', { name: 'Deletar' }))
        fireEvent.click(screen.getByRole('button', { name: 'Deletar' }))

        expect(mutate).toHaveBeenCalledWith({
            id: '123',
            data: {} as Data,
        })
    })

    it('should show loading state when mutate is loading', () => {
        vi.mocked(usePageMutation).mockReturnValue({
            mutate: vi.fn(),
            isLoading: true,
        })

        render(<DeletePageButton />)

        fireEvent.click(screen.getByRole('button', { name: 'Deletar' }))

        expect(screen.getByText(/Deletando.../i)).toBeInTheDocument()
    })
})
