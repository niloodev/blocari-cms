import { render, screen } from '@testing-library/react'
import { MenusSidebar } from './MenusSidebar'
import { ImagePlus } from 'lucide-react'
import { useEditor } from '@/modules/editor/store'
import { EditorStore } from '@/modules/editor/store/editorSlice/editorSlice.types'

const mockedDefaultMenu = {
    icon: <ImagePlus width={20} height={20} />,
    title: 'Galeria',
    menu: 'GalleryMenu',
    properties: 'GalleryProperties',
}

vi.mock('@/modules/editor/components/molecules', () => ({
    MenuSelector: vi.fn(),
}))

vi.mock('@/modules/editor/menus', () => ({
    GalleryMenu: vi.fn(() => <div>Galeria</div>),
    TypographyMenu: vi.fn(() => <div>Tipografia</div>),
    ComponentsMenu: vi.fn(() => <div>Componentes</div>),
}))

vi.mock('@/modules/editor/store', () => ({
    useEditor: vi.fn(),
}))

beforeEach(() => {
    vi.clearAllMocks()

    vi.mocked(useEditor).mockReturnValue({
        selectedMenu: mockedDefaultMenu,
    } as EditorStore)
})

describe('Organisms: MenusSidebar', () => {
    it('should render default menu correctly', () => {
        render(<MenusSidebar />)

        expect(screen.getByText('Galeria')).toBeInTheDocument()
    })

    it('should render fallback fragment when menu is not selected', () => {
        vi.mocked(useEditor).mockReturnValue({
            selectedMenu: null,
        } as unknown as EditorStore)

        render(<MenusSidebar />)

        expect(screen.queryByText('Galeria')).not.toBeInTheDocument()
        expect(screen.queryByText('Tipografia')).not.toBeInTheDocument()
        expect(screen.queryByText('Componentes')).not.toBeInTheDocument()
    })
})
