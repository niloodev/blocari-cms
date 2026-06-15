import { render, screen } from '@testing-library/react'
import { PropertiesSidebar } from './PropertiesSidebar'
import { ImagePlus } from 'lucide-react'
import { useEditor } from '@/modules/editor/store'
import { EditorStore } from '@/modules/editor/store/editorSlice/editorSlice.types'
import { usePuck } from '@measured/puck'

const mockedDefaultMenu = {
    icon: <ImagePlus width={20} height={20} />,
    title: 'Galeria',
    menu: 'GalleryMenu',
    properties: 'GalleryProperties',
}

vi.mock('@measured/puck', () => ({
    usePuck: vi.fn(),
}))

vi.mock('@/modules/editor/properties', () => ({
    GalleryProperties: vi.fn(() => <div>Galeria</div>),
    TypographyProperties: vi.fn(() => <div>Tipografia</div>),
    ComponentsProperties: vi.fn(() => <div>Componentes</div>),
}))

vi.mock('@/modules/editor/store', () => ({
    useEditor: vi.fn(),
}))

beforeEach(() => {
    vi.clearAllMocks()

    vi.mocked(useEditor).mockReturnValue({
        selectedMenu: mockedDefaultMenu,
    } as EditorStore)

    vi.mocked(usePuck).mockReturnValue({
        appState: {
            ui: {
                itemSelector: null,
            },
        },
        dispatch: vi.fn(),
    } as unknown as ReturnType<typeof usePuck>)
})

describe('Organisms: PropertiesSidebar', () => {
    it('should render default properties correctly', () => {
        render(<PropertiesSidebar />)

        expect(screen.getByText('Galeria')).toBeInTheDocument()
    })

    it('should render fallback fragment when properties is not selected', () => {
        vi.mocked(useEditor).mockReturnValue({
            selectedMenu: null,
        } as unknown as EditorStore)

        render(<PropertiesSidebar />)

        expect(screen.queryByText('Galeria')).not.toBeInTheDocument()
        expect(screen.queryByText('Tipografia')).not.toBeInTheDocument()
        expect(screen.queryByText('Componentes')).not.toBeInTheDocument()
    })

    it('should dispatch action to Puck to remove selection when rendered', () => {
        const { dispatch } = usePuck()

        vi.mocked(useEditor).mockReturnValue({
            selectedMenu: null,
        } as unknown as EditorStore)

        render(<PropertiesSidebar />)

        expect(dispatch).toHaveBeenCalledWith({
            type: 'setUi',
            ui: {
                itemSelector: null,
                field: {
                    focus: null,
                },
            },
        })
    })

    it('should always render components properties when Puck have selected item', () => {
        vi.mocked(usePuck).mockReturnValue({
            appState: {
                ui: {
                    itemSelector: {
                        id: '1',
                        type: 'component',
                    },
                },
            },
            dispatch: vi.fn(),
        } as unknown as ReturnType<typeof usePuck>)

        render(<PropertiesSidebar />)

        expect(screen.getByText('Componentes')).toBeInTheDocument()
    })
})
