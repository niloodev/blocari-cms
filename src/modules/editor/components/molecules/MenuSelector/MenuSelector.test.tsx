import { act, fireEvent, render, screen } from '@testing-library/react'
import { defaultMenu, menus } from '@/modules/editor/editor.constants'
import { MenuSelector } from './MenuSelector'
import { EditorStore } from '@/modules/editor/store/editorSlice/editorSlice.types'
import { useEditor } from '@/modules/editor/store'

vi.mock('@/modules/editor/store', () => ({
    useEditor: vi.fn(),
}))

beforeEach(() => {
    vi.clearAllMocks()

    vi.mocked(useEditor).mockReturnValue({
        selectedMenu: defaultMenu,
        setSelectedMenu: vi.fn(),
    } as unknown as EditorStore)
})

describe('Molecules: MenuSelector', () => {
    it('should render all menus correctly', () => {
        render(<MenuSelector />)

        menus.forEach(menu => {
            menu.forEach(item => {
                expect(screen.getByLabelText(item.title)).toBeInTheDocument()
            })
        })
    })

    it('should select the correct menu when clicked', () => {
        const { setSelectedMenu } = useEditor()

        render(<MenuSelector />)

        const button = screen.getByLabelText(menus[1][0].title)

        act(() => {
            fireEvent.click(button)
        })

        expect(setSelectedMenu).toHaveBeenCalledWith(menus[1][0])
    })

    it('should have the correct class when the menu is selected', () => {
        vi.mocked(useEditor).mockReturnValue({
            selectedMenu: menus[1][0],
            setSelectedMenu: vi.fn(),
        } as unknown as EditorStore)

        render(<MenuSelector />)

        const button = screen.getByLabelText(menus[1][0].title)

        expect(button).toHaveClass('text-primary')
    })
})
