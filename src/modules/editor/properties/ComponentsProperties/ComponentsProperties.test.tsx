import { render, screen } from '@testing-library/react'
import { ComponentsProperties } from '.'
import { usePuck } from '@measured/puck'
import { EditorStore } from '../../store/editorSlice/editorSlice.types'
import { useEditor } from '../../store'

vi.mock('./subcomponents', () => ({
    PropertyComponentHeader: () => <div>Property Component Header</div>,
}))

vi.mock('@measured/puck', async importOriginal => {
    const actual = await importOriginal<typeof import('@measured/puck')>()
    return {
        ...actual,
        usePuck: vi.fn(),
        Puck: {
            Fields: () => <div>Fields</div>,
        },
    }
})

vi.mock('@/modules/editor/store', () => ({
    useEditor: vi.fn(),
}))

beforeEach(() => {
    vi.clearAllMocks()

    vi.mocked(usePuck).mockReturnValue({
        appState: {
            ui: { itemSelector: null },
        },
    } as unknown as ReturnType<typeof usePuck>)

    vi.mocked(useEditor).mockReturnValue({
        isLoading: false,
    } as EditorStore)
})

describe('Properties: ComponentsProperties', () => {
    it('should render correctly when don`t have component selected', () => {
        render(<ComponentsProperties />)

        expect(screen.queryByText('Fields')).not.toBeInTheDocument()
    })

    it('should render correctly when have component selected', () => {
        vi.mocked(usePuck).mockReturnValue({
            appState: {
                ui: { itemSelector: true },
            },
        } as unknown as ReturnType<typeof usePuck>)

        render(<ComponentsProperties />)

        expect(screen.getByText('Fields')).toBeInTheDocument()
    })

    it('should render loading state', () => {
        vi.mocked(useEditor).mockReturnValue({
            isLoading: true,
        } as EditorStore)

        render(<ComponentsProperties />)

        expect(
            screen.getByTestId('components-properties-loading'),
        ).toBeInTheDocument()
    })
})
