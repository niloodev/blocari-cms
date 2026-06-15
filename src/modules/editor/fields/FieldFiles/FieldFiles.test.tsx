import { FieldFiles } from './FieldFiles'
import { fireEvent, render, screen } from '@testing-library/react'
import { useFieldFiles } from './FieldFiles.hook'
import { renderHook } from '@testing-library/react'
import { act, ChangeEvent, MouseEvent } from 'react'

const mockFiles = [
    new File([''], 'test.png', { type: 'image/png' }),
    new File([''], 'test.jpg', { type: 'image/jpeg' }),
]

vi.mock('./subcomponents', () => ({
    FileRow: ({ file }: { file: File }) => <div>{file.name}</div>,
}))

describe('Fields: FieldFiles', () => {
    it('should render correctly', () => {
        render(<FieldFiles files={mockFiles} allowedExtensions={'png,jpg'} />)

        expect(screen.getByText('Arquivos')).toBeInTheDocument()

        mockFiles.forEach(file => {
            expect(screen.getByText(file.name)).toBeInTheDocument()
        })
    })

    it('should render add file button when files length is less than limit', () => {
        render(<FieldFiles files={mockFiles} allowedExtensions={'png,jpg'} />)

        expect(screen.getByLabelText('Adicionar arquivo')).toBeInTheDocument()
    })

    it('should not render add file button when files length is greater than limit', () => {
        render(
            <FieldFiles
                files={mockFiles}
                allowedExtensions={'png,jpg'}
                limit={1}
            />,
        )

        expect(
            screen.queryByLabelText('Adicionar arquivo'),
        ).not.toBeInTheDocument()
    })

    it('should click input file when clicking add file button', () => {
        render(<FieldFiles files={mockFiles} allowedExtensions={'png,jpg'} />)

        const inputFile = screen.getByTestId('input-file')
        const addFileButton = screen.getByLabelText('Adicionar arquivo')

        inputFile.click = vi.fn()

        fireEvent.click(addFileButton)

        expect(inputFile.click).toHaveBeenCalled()
    })

    it('should have working useFieldFiles hook', () => {
        const mockOnValueChange = vi.fn()

        const { result } = renderHook(() =>
            useFieldFiles({
                onValueChange: mockOnValueChange,
            }),
        )

        expect(result.current.addFile).toBeDefined()
        expect(result.current.handleOnClick).toBeDefined()

        act(() => {
            result.current.addFile({
                target: {
                    files: mockFiles as unknown as FileList,
                },
            } as ChangeEvent<HTMLInputElement>)
        })

        const call = mockOnValueChange.mock.calls[0][0]([])

        expect(call).toEqual([mockFiles[0]])
    })

    it('should not add file when file is not provided', () => {
        const mockOnValueChange = vi.fn()

        const { result } = renderHook(() =>
            useFieldFiles({
                onValueChange: mockOnValueChange,
            }),
        )

        act(() => {
            result.current.addFile({
                target: {
                    files: null,
                },
            } as ChangeEvent<HTMLInputElement>)
        })

        expect(mockOnValueChange).not.toHaveBeenCalled()
    })

    it('should have useFieldFiles resetting input value when clicking add file button', () => {
        const { result } = renderHook(() =>
            useFieldFiles({
                onValueChange: vi.fn(),
            }),
        )

        const e = {
            target: {
                value: 'test',
            },
        }

        act(() => {
            result.current.handleOnClick(
                e as unknown as MouseEvent<HTMLInputElement>,
            )
        })

        expect(e.target.value).toBe('')
    })
})
