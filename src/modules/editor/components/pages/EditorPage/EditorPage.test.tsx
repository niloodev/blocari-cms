import { render, screen } from '@testing-library/react'
import { EditorPage as EditorPageServer } from './EditorPage'
import { getPageById } from '@/core/controllers/pages'
import { Data } from '@measured/puck'
import { pageErrors } from '@/core/controllers/pages/pages.errors'

vi.mock('@/modules/editor/store/editorSlice', async importOriginal => {
    const actual =
        await importOriginal<
            typeof import('@/modules/editor/store/editorSlice')
        >()

    return {
        ...actual,
        EditorStoreProvider: vi
            .fn()
            .mockImplementation(({ children }) => children),
    }
})

vi.mock('@/core/controllers/pages', () => ({
    getPageById: vi.fn(),
}))

vi.mock('@/modules/editor/components/organisms', () => ({
    Header: vi.fn(),
    MenusSidebar: vi.fn(),
    Preview: vi.fn().mockImplementation(() => <div>Preview</div>),
    PropertiesSidebar: vi.fn(),
    PuckWrapper: vi.fn().mockImplementation(({ children }) => children),
    CustomDragOverlay: vi.fn(),
    headerHeight: 100,
}))

vi.mock('@/modules/editor/editor.config', () => ({
    config: vi.fn(),
    uiConfig: vi.fn(),
    plugins: vi.fn(),
}))

vi.mock('@/modules/editor/editor.constants', async importOriginal => {
    const actual =
        await importOriginal<
            typeof import('@/modules/editor/editor.constants')
        >()

    return {
        ...actual,
        viewports: vi.fn(),
    }
})

beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(getPageById).mockResolvedValue({
        status: 'success',
        payload: {
            _id: '1',
            title: 'Test',
            slug: '/test',
            content: {} as Data,
            dynamicAdaptor: '',
            description: 'Test',
            canonical: 'https://www.google.com',
            opengraphImage: 'https://www.google.com',
        },
        message: 'Test',
    })
})

describe('Pages: EditorPage', () => {
    it('should render server with correct props', async () => {
        render(await EditorPageServer({ id: '1' }))

        expect(getPageById).toHaveBeenCalledWith('1')
        expect(screen.getByText('Preview')).toBeInTheDocument()
    })

    it('should redirect to editor page when page is not found', async () => {
        vi.mocked(getPageById).mockResolvedValue({
            status: 'error',
            error: pageErrors.pageNotFound,
        })

        await expect(EditorPageServer({ id: '2' })).rejects.toThrow(
            'NEXT_REDIRECT',
        )
    })

    it('should render editor page when no id is provided', async () => {
        render(await EditorPageServer({ id: null as unknown as string }))

        expect(screen.getByText('Preview')).toBeInTheDocument()
    })
})
