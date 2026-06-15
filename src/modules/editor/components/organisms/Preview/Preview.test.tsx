import { waitFor, render, screen } from '@testing-library/react'
import { Preview } from './Preview'
import { Preview as PreviewLazy } from './index'
import { useEditor } from '@/modules/editor/store'
import { EditorStore } from '@/modules/editor/store/editorSlice/editorSlice.types'
import { usePuck } from '@measured/puck'
import { useState, useEffect, useRef } from 'react'

vi.mock('@/modules/editor/store', () => ({
    useEditor: vi.fn(),
}))

vi.mock('@measured/puck', () => ({
    usePuck: vi.fn(),
    Puck: {
        Preview: vi.fn(() => (
            <div className="min-w-[1000px] min-h-[1000px]">Preview</div>
        )),
    },
}))

vi.mock('react', async importOriginal => {
    const reactModule = await importOriginal<typeof import('react')>()

    return {
        ...reactModule,
        useRef: vi.fn().mockImplementation(reactModule.useRef),
    }
})

beforeEach(() => {
    vi.clearAllMocks()

    vi.mocked(useEditor).mockReturnValue({
        isLoading: false,
    } as EditorStore)

    vi.mocked(usePuck).mockReturnValue({
        appState: {
            ui: {
                viewports: { current: { width: 1000, height: 1000 } },
            },
        },
    } as unknown as ReturnType<typeof usePuck>)
})

describe('Organisms: Preview', () => {
    it('should render correctly with preview', () => {
        render(<Preview />)

        expect(screen.getByText('Preview')).toBeInTheDocument()
    })

    it('should render correctly with lazy loading', async () => {
        render(<PreviewLazy />)

        await waitFor(() => {
            expect(screen.getByText('Preview')).toBeInTheDocument()
        })
    })

    it('should render loading when isLoading is true', () => {
        vi.mocked(useEditor).mockReturnValue({
            isLoading: true,
        } as EditorStore)

        render(<Preview />)

        expect(screen.getByTestId('preview-loading')).toBeInTheDocument()
    })

    it('should render proportions and styles of preview correctly', () => {
        render(<Preview />)

        const previewWrapper = screen.getByTestId('preview-wrapper')

        expect(previewWrapper).toHaveStyle({
            minWidth: '1000px',
            height: '0',
            transform: 'scale(0)',
            transformOrigin: 'top',
        })
    })

    it('should debounce loading when isLoading changes to false ', async () => {
        vi.mocked(useEditor).mockImplementation(() => {
            const [isLoading, setIsLoading] = useState(true)

            useEffect(() => {
                setIsLoading(false)
            }, [])

            return { isLoading } as EditorStore
        })

        render(<Preview />)

        expect(screen.getByTestId('preview-loading')).toBeInTheDocument()

        await waitFor(() => {
            expect(
                screen.queryByTestId('preview-loading'),
            ).not.toBeInTheDocument()
        })
    })

    it('should update preview proportions when ref is not mounted yet', () => {
        vi.mocked(useRef).mockImplementation(() => {
            const ref = { current: null }
            return ref
        })

        render(<Preview />)

        expect(screen.getByTestId('preview-wrapper')).toHaveStyle({
            minWidth: '1000px',
            height: '0',
            transform: 'scale(0)',
            transformOrigin: 'top',
        })
    })
})
