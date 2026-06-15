import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { GalleryProperties } from '.'
import { createImage, updateImage } from '@/core/controllers/images'
import { imageErrors } from '@/core/controllers/images/images.errors'
import { addToast } from '@/shared/libs/heroui'
import { isValidImageUrl, extractFileNameFromUrl } from '@/core/tools'

vi.mock('@/core/controllers/images', () => ({
    createImage: vi.fn(),
    updateImage: vi.fn(),
}))

vi.mock('@/shared/libs/heroui', () => ({
    addToast: vi.fn(),
    Button: ({
        children,
        type,
        isDisabled,
        isLoading,
        onClick,
    }: {
        children: React.ReactNode
        type?: 'button' | 'submit' | 'reset'
        isDisabled?: boolean
        isLoading?: boolean
        onClick?: () => void
    }) => (
        <button
            type={type}
            disabled={isDisabled}
            onClick={onClick}
            data-testid="submit-button"
            data-loading={isLoading}
        >
            {children}
        </button>
    ),
}))

vi.mock('@/core/tools', () => ({
    isValidImageUrl: vi.fn(),
    extractFileNameFromUrl: vi.fn(),
}))

vi.mock('next/navigation', () => ({
    useRouter: () => ({ refresh: vi.fn() }),
}))

vi.mock('next/image', () => ({
    default: ({ src, alt }: { src: string; alt: string }) => (
        <img src={src} alt={alt} data-testid="preview-image" />
    ),
}))

vi.mock('@/modules/editor/components/atoms', () => ({
    PropertyContainer: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="property-container">{children}</div>
    ),
    PropertyTitle: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="property-title">{children}</div>
    ),
}))

// Mapeia cada FieldText (Nome / Texto Alternativo / Título) para um testid único.
const labelToKey: Record<string, string> = {
    Nome: 'name',
    'Texto Alternativo': 'alt',
    Título: 'title',
}

vi.mock('@/modules/editor/fields', () => ({
    FieldText: ({
        label,
        value,
        isRequired,
        onValueChange,
    }: {
        label: string
        value?: string
        isRequired?: boolean
        onValueChange?: (value: string) => void
    }) => {
        const key = labelToKey[label] || 'field'
        return (
            <div data-testid={`field-${key}`}>
                <label>{label}</label>
                <input
                    type="text"
                    value={value || ''}
                    required={isRequired}
                    onChange={e => onValueChange?.(e.target.value)}
                    data-testid={`${key}-input`}
                />
            </div>
        )
    },
    FieldFiles: ({
        label,
        files,
        allowedExtensions,
        onValueChange,
    }: {
        label: string
        files?: File[]
        allowedExtensions?: string
        onValueChange?: (files: File[]) => void
    }) => (
        <div data-testid="field-files">
            <label>{label}</label>
            <input
                type="file"
                multiple
                accept={allowedExtensions}
                onChange={e => onValueChange?.(Array.from(e.target.files || []))}
                data-testid="files-input"
            />
            <span data-testid="files-count">{files?.length || 0}</span>
        </div>
    ),
}))

const mockSetSharedMenuData = vi.fn()
const mockSharedMenuData: any = {
    selectedImageId: null,
    selectedImagePayload: null,
    selectedImageTrigger: false,
}

vi.mock('@/modules/editor/store', () => ({
    useEditor: () => ({
        sharedMenuData: mockSharedMenuData,
        setSharedMenuData: mockSetSharedMenuData,
    }),
}))

const mockCreateImage = vi.mocked(createImage)
const mockUpdateImage = vi.mocked(updateImage)
const mockAddToast = vi.mocked(addToast)
const mockIsValidImageUrl = vi.mocked(isValidImageUrl)
const mockExtractFileNameFromUrl = vi.mocked(extractFileNameFromUrl)

// Simula a leitura de um arquivo como data URL (base64).
const uploadFile = (dataUrl = 'data:image/jpeg;base64,QUJD') => {
    const fileInput = screen.getByTestId('files-input')
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' })
    const mockFileReader = {
        readAsDataURL: vi.fn(),
        onload: null as any,
    }
    global.FileReader = vi.fn(() => mockFileReader) as any
    fireEvent.change(fileInput, { target: { files: [file] } })
    mockFileReader.onload?.({ target: { result: dataUrl } })
    return { file, mockFileReader }
}

describe('Properties: GalleryProperties', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        mockIsValidImageUrl.mockReturnValue(true)
        mockExtractFileNameFromUrl.mockReturnValue('test.jpg')
        Object.assign(mockSharedMenuData, {
            selectedImageId: null,
            selectedImagePayload: null,
            selectedImageTrigger: false,
        })
    })

    describe('Create mode', () => {
        it('should render create mode correctly', () => {
            render(<GalleryProperties />)

            expect(screen.getByTestId('property-title')).toHaveTextContent(
                'Adicionar Imagem',
            )
            expect(screen.getByTestId('name-input')).toBeInTheDocument()
            expect(screen.getByTestId('field-files')).toBeInTheDocument()
            expect(screen.getByTestId('submit-button')).toHaveTextContent(
                'Criar',
            )
        })

        it('should show upload placeholder when no preview', () => {
            render(<GalleryProperties />)

            expect(
                screen.getByText(
                    'Adicione uma imagem abaixo clicando no botão +',
                ),
            ).toBeInTheDocument()
        })

        it('should read uploaded file as data URL', () => {
            render(<GalleryProperties />)
            const { file, mockFileReader } = uploadFile()
            expect(mockFileReader.readAsDataURL).toHaveBeenCalledWith(file)
        })

        it('should not read a zero-size file', () => {
            render(<GalleryProperties />)

            const fileInput = screen.getByTestId('files-input')
            const emptyFile = new File([''], 'empty.jpg', {
                type: 'image/jpeg',
            })
            const mockFileReader = {
                readAsDataURL: vi.fn(),
                onload: null as any,
            }
            global.FileReader = vi.fn(() => mockFileReader) as any
            fireEvent.change(fileInput, { target: { files: [emptyFile] } })

            expect(mockFileReader.readAsDataURL).not.toHaveBeenCalled()
        })

        it('should submit and create the image with the full payload', async () => {
            mockCreateImage.mockResolvedValue({
                status: 'success',
                message: 'Imagem criada com sucesso',
                payload: { _id: '1', name: 'Test', src: '/api/images/1' },
            })

            render(<GalleryProperties />)

            fireEvent.change(screen.getByTestId('name-input'), {
                target: { value: 'Test Image' },
            })
            uploadFile('data:image/jpeg;base64,QUJD')
            fireEvent.click(screen.getByTestId('submit-button'))

            await waitFor(() => {
                expect(mockCreateImage).toHaveBeenCalledWith({
                    name: 'Test Image',
                    src: 'data:image/jpeg;base64,QUJD',
                    alt: '',
                    title: '',
                })
                expect(mockAddToast).toHaveBeenCalledWith({
                    title: 'Imagem criada com sucesso',
                    description: 'Já está salvo na galeria! 🎉',
                    color: 'success',
                })
            })
        })

        it('should show an error toast when creation fails', async () => {
            mockCreateImage.mockResolvedValue({
                status: 'error',
                error: imageErrors.imageNotCreated,
            })

            render(<GalleryProperties />)

            fireEvent.change(screen.getByTestId('name-input'), {
                target: { value: 'Test Image' },
            })
            uploadFile('data:image/jpeg;base64,QUJD')
            fireEvent.click(screen.getByTestId('submit-button'))

            await waitFor(() => {
                expect(mockAddToast).toHaveBeenCalledWith({
                    title: 'Erro ao criar imagem',
                    description: imageErrors.imageNotCreated,
                    color: 'danger',
                })
            })
        })
    })

    describe('Edit mode', () => {
        beforeEach(() => {
            mockSharedMenuData.selectedImageId = '1'
            mockSharedMenuData.selectedImagePayload = {
                name: 'Existing Image',
                src: '/api/images/1',
                alt: '',
                title: '',
            }
        })

        it('should render edit mode correctly and populate the name', () => {
            render(<GalleryProperties />)

            expect(screen.getByTestId('property-title')).toHaveTextContent(
                'Editar Imagem',
            )
            expect(screen.getByTestId('submit-button')).toHaveTextContent(
                'Salvar Alterações',
            )
            expect(screen.getByTestId('name-input')).toHaveValue(
                'Existing Image',
            )
        })

        it('should show the preview image for existing data', () => {
            render(<GalleryProperties />)

            expect(screen.getByTestId('preview-image')).toHaveAttribute(
                'src',
                '/api/images/1',
            )
        })

        it('should submit and update the image', async () => {
            mockUpdateImage.mockResolvedValue({
                status: 'success',
                message: 'Imagem atualizada com sucesso',
                payload: { _id: '1', name: 'Updated', src: '/api/images/1' },
            })

            render(<GalleryProperties />)

            fireEvent.change(screen.getByTestId('name-input'), {
                target: { value: 'Updated' },
            })
            fireEvent.click(screen.getByTestId('submit-button'))

            await waitFor(() => {
                expect(mockUpdateImage).toHaveBeenCalledWith(
                    expect.objectContaining({ name: 'Updated', _id: '1' }),
                )
                expect(mockAddToast).toHaveBeenCalledWith({
                    title: 'Imagem atualizada com sucesso',
                    description: 'Já está salvo na galeria! 🎉',
                    color: 'success',
                })
            })
        })
    })
})
