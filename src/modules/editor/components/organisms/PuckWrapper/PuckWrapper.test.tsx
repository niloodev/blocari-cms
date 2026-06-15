import { render, screen } from '@testing-library/react'
import { PuckWrapper } from './PuckWrapper'
import { usePuck } from '@measured/puck'
import { IPage } from '@/core/models/pages'
import { rootDefaultProps } from '@/modules/editor/editor.config'

vi.mock('@/modules/editor/editor.config', () => ({
    rootDefaultProps: {
        title: 'Test',
        description: 'Test',
        dynamicAdaptor: 'products' as const,
    },
}))

vi.mock('@measured/puck', () => ({
    Puck: vi.fn().mockImplementation(({ children }) => children),
    usePuck: vi.fn(),
}))

beforeEach(() => {
    vi.mocked(usePuck).mockReturnValue({
        dispatch: vi.fn(),
    } as unknown as ReturnType<typeof usePuck>)
})

describe('Organisms: PuckWrapper', () => {
    it('should render children correctly', () => {
        render(
            <PuckWrapper config={{ components: {} }}>
                <div>Test</div>
            </PuckWrapper>,
        )

        expect(screen.getByText('Test')).toBeInTheDocument()
    })

    it('should dispatch action to Puck to set data correctly', () => {
        const { dispatch } = usePuck()

        const page: IPage = {
            _id: '1',
            title: 'Test',
            slug: '/test',
            dynamicAdaptor: '',
            content: {} as IPage['content'],
        }

        render(<PuckWrapper config={{ components: {} }} page={page} />)

        expect(dispatch).toHaveBeenCalledWith({
            type: 'setData',
            data: page.content,
        })
    })

    it('should fallback when page not provided', () => {
        const { dispatch } = usePuck()

        render(<PuckWrapper config={{ components: {} }} />)

        expect(dispatch).toHaveBeenCalledWith({
            type: 'setData',
            data: {
                zones: {},
                content: [],
                root: {
                    props: rootDefaultProps,
                },
            },
        })
    })
})
