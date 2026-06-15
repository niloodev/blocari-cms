import { fireEvent, render, screen } from '@testing-library/react'
import { FileRow } from './FileRow'
import { renderHook } from '@testing-library/react'
import { useFileRow } from './FileRow.hook'
import { act, ChangeEvent } from 'react'
window.URL.createObjectURL = vi.fn()

const mockFile = new File([''], 'test.png', { type: 'image/png' })
const allMocksFiles = [
    mockFile,
    new File([''], 'test.jpg', { type: 'image/jpeg' }),
    new File([''], 'test.gif', { type: 'image/gif' }),
]

describe('FieldFiles: FileRow', () => {
    it('should render correctly', () => {
        render(
            <FileRow file={mockFile} index={0} allowedExtensions={'png,jpg'} />,
        )

        expect(screen.getByText(mockFile.name)).toBeInTheDocument()
        expect(screen.getByLabelText('Remover arquivo')).toBeInTheDocument()
        expect(screen.getByLabelText('Substituir arquivo')).toBeInTheDocument()
    })

    it('should call replaceFile when clicking on the replace file button', () => {
        const replaceFile = vi.fn()

        render(
            <FileRow
                file={mockFile}
                index={0}
                allowedExtensions={'png,jpg'}
                onValueChange={replaceFile}
            />,
        )

        const replaceFileInput = screen.getByTestId('replace-file-input')
        const replaceFileButton = screen.getByLabelText('Substituir arquivo')

        replaceFileInput.click = vi.fn()

        fireEvent.click(replaceFileButton)

        expect(replaceFileInput.click).toHaveBeenCalled()
    })

    it('should deleteFile when using useFileRow hook', () => {
        const mockOnValueChange = vi.fn()

        const { result } = renderHook(() =>
            useFileRow({
                index: 0,
                onValueChange: mockOnValueChange,
            }),
        )

        expect(result.current.deleteFile).toBeDefined()

        act(() => {
            result.current.deleteFile()
        })

        const call = mockOnValueChange.mock.calls[0][0](allMocksFiles)

        expect(call).toEqual(allMocksFiles.filter((_, i) => i !== 0))
    })

    it('should replaceFile when using useFileRow hook', () => {
        const mockOnValueChange = vi.fn()

        const { result } = renderHook(() =>
            useFileRow({ index: 0, onValueChange: mockOnValueChange }),
        )

        expect(result.current.replaceFile).toBeDefined()

        const newFile = new File([''], 'new-file.png', {
            type: 'image/png',
        })

        act(() => {
            result.current.replaceFile({
                target: {
                    files: [newFile],
                },
            } as unknown as ChangeEvent<HTMLInputElement>)
        })

        const call = mockOnValueChange.mock.calls[0][0](allMocksFiles)

        expect(call).toEqual(
            allMocksFiles.map((file, index) => (index === 0 ? newFile : file)),
        )
    })

    it('should not replaceFile when file is not provided', () => {
        const mockOnValueChange = vi.fn()

        const { result } = renderHook(() =>
            useFileRow({ index: 0, onValueChange: mockOnValueChange }),
        )

        act(() => {
            result.current.replaceFile({
                target: {
                    files: null,
                },
            } as unknown as ChangeEvent<HTMLInputElement>)
        })

        expect(mockOnValueChange).not.toHaveBeenCalled()
    })
})
