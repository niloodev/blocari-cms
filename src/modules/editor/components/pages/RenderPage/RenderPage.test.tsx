import { render, screen } from '@testing-library/react'
import { RenderPage } from './RenderPage'
import { Data } from '@measured/puck'

const pageMockup = {
    _id: '1',
    title: 'Test',
    slug: 'test',
    content: {} as Data,
    dynamicAdaptor: 'products' as const,
}

vi.mock('@/modules/editor/editor.config', () => ({
    config: vi.fn(),
}))

vi.mock('@measured/puck', () => ({
    Render: vi.fn().mockImplementation(() => <div>Render</div>),
}))

describe('Pages: RenderPage', () => {
    it('should render with provided page', async () => {
        render(await RenderPage({ page: pageMockup }))

        expect(screen.getByText('Render')).toBeInTheDocument()
    })
})
