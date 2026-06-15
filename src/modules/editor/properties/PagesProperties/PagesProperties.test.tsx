import { render, screen } from '@testing-library/react'
import { PagesProperties } from '.'
import { EditorStore } from '@/modules/editor/store/editorSlice/editorSlice.types'
import { useEditor } from '@/modules/editor/store'

vi.mock('./subcomponents', () => ({
    DeletePageButton: () => <button>Delete Page Button</button>,
}))

vi.mock('@/modules/editor/store', () => ({
    useEditor: vi.fn(),
}))

beforeEach(() => {
    vi.clearAllMocks()

    vi.mocked(useEditor).mockReturnValue({
        isLoading: false,
    } as EditorStore)
})

describe('Properties: PagesProperties', () => {
    it('should render correctly', () => {
        render(<PagesProperties />)

        expect(screen.getByText('Delete Page Button')).toBeInTheDocument()
        expect(screen.getByText('Editar Página')).toBeInTheDocument()
    })

    it('should render loading state', () => {
        vi.mocked(useEditor).mockReturnValue({
            isLoading: true,
        } as EditorStore)

        render(<PagesProperties />)

        expect(
            screen.getByTestId('pages-properties-loading'),
        ).toBeInTheDocument()
    })
})
