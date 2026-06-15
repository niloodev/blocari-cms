/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { GalleryMenu } from './index'
import { GalleryMenuLoading } from './GalleryMenu.loading'
import { GalleryMenuError } from './GalleryMenu.error'
import { getImages } from '@/core/controllers/images'
import { imageErrors } from '@/core/controllers/images/images.errors'
import { addToast } from '@/shared/libs/heroui'
import { IImage } from '@/core/models/images'

const originalError = console.error
beforeAll(() => {
    console.error = vi.fn()
})

afterAll(() => {
    console.error = originalError
})

vi.mock('@/core/controllers/images', () => ({
    getImages: vi.fn(),
}))

vi.mock('@/shared/libs/heroui', () => ({
    addToast: vi.fn(),
    Spinner: ({ 'data-testid': testId, size, variant }: any) => (
        <div data-testid={testId} data-size={size} data-variant={variant}>
            Loading...
        </div>
    ),
    Skeleton: ({ className }: any) => (
        <div data-testid="skeleton" className={className}>
            Loading skeleton...
        </div>
    ),
    Alert: ({ title, description, color, classNames }: any) => (
        <div
            data-testid="alert"
            data-color={color}
            className={classNames?.base}
        >
            <div data-testid="alert-title">{title}</div>
            <div data-testid="alert-description">{description}</div>
        </div>
    ),
}))

vi.mock('@/modules/editor/components/atoms', () => ({
    ImageButton: ({ name, image, selected, onPress }: any) => (
        <button
            onClick={onPress}
            disabled={selected}
            data-testid={`image-button-${name}`}
            data-selected={selected}
            aria-label={name}
        >
            <img src={image.src} alt={name} />
            <span>{name}</span>
        </button>
    ),
    MenuTitle: ({ children }: any) => (
        <div data-testid="menu-title">{children}</div>
    ),
    AddButton: ({
        onPress,
        isDisabled,
        className,
        'aria-label': ariaLabel,
    }: any) => (
        <button
            onClick={onPress}
            disabled={isDisabled}
            className={className}
            aria-label={ariaLabel}
            data-testid="add-button"
            data-disabled={isDisabled}
        >
            Adicionar
        </button>
    ),
}))

vi.mock('motion/react', () => ({
    motion: {
        div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    },
}))

vi.mock('next/navigation', () => ({
    useRouter: () => ({
        refresh: vi.fn(),
    }),
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

const mockDispatch = vi.fn()
vi.mock('@measured/puck', () => ({
    usePuck: () => ({
        dispatch: mockDispatch,
    }),
}))

const mockGetImages = vi.mocked(getImages)
const mockAddToast = vi.mocked(addToast)

describe('Menus: GalleryMenu', () => {
    const mockImages = [
        {
            _id: '1',
            name: 'Image 1',
            src: 'https://example.com/image1.jpg',
        },
        {
            _id: '2',
            name: 'Image 2',
            src: 'https://example.com/image2.jpg',
        },
        {
            _id: '3',
            name: 'Image 3',
            src: 'https://example.com/image3.jpg',
        },
    ]

    beforeEach(() => {
        vi.clearAllMocks()
        Object.assign(mockSharedMenuData, {
            selectedImageId: null,
            selectedImagePayload: null,
            selectedImageTrigger: false,
        })
    })

    describe('Initial state', () => {
        it('should render gallery menu with title', () => {
            mockGetImages.mockResolvedValue({
                status: 'success',
                message: 'Imagens carregadas com sucesso',
                payload: [],
            })

            render(<GalleryMenu />)

            expect(screen.getByTestId('menu-title')).toHaveTextContent(
                'Galeria',
            )
        })

        it('should show loading spinner initially', async () => {
            mockGetImages.mockResolvedValue({
                status: 'success',
                message: 'Imagens carregadas com sucesso',
                payload: [],
            })

            render(<GalleryMenu />)

            // O componente inicialmente renderiza o GalleryMenuLoading devido ao dynamic import
            expect(
                screen.getByTestId('gallery-menu-loading'),
            ).toBeInTheDocument()

            // Aguardar que o componente principal seja carregado
            await waitFor(() => {
                expect(screen.getByTestId('menu-title')).toHaveTextContent(
                    'Galeria',
                )
            })
        })

        it('should reset selected image data on mount', async () => {
            mockGetImages.mockResolvedValue({
                status: 'success',
                message: 'Imagens carregadas com sucesso',
                payload: [],
            })

            render(<GalleryMenu />)

            // Aguardar que o componente principal seja carregado
            await waitFor(() => {
                expect(mockSetSharedMenuData).toHaveBeenCalledWith(
                    'selectedImageId',
                    null,
                )
                expect(mockSetSharedMenuData).toHaveBeenCalledWith(
                    'selectedImagePayload',
                    null,
                )
            })
        })

        it('should set selectedImageTrigger to false on mount', async () => {
            mockGetImages.mockResolvedValue({
                status: 'success',
                message: 'Imagens carregadas com sucesso',
                payload: [],
            })

            render(<GalleryMenu />)

            // Aguardar que o componente principal seja carregado
            await waitFor(() => {
                expect(mockSetSharedMenuData).toHaveBeenCalledWith(
                    'selectedImageTrigger',
                    false,
                )
            })
        })
    })

    describe('Loading state', () => {
        it('should show loading spinner when isLoading is true', async () => {
            mockGetImages.mockImplementation(
                () => new Promise(resolve => setTimeout(resolve, 100)),
            )

            render(<GalleryMenu />)

            // Aguardar que o componente principal seja carregado e mostre o spinner interno
            await waitFor(() => {
                expect(
                    screen.getByTestId('gallery-menu-loading-spinner'),
                ).toBeInTheDocument()
            })
        })

        it('should hide loading spinner when data is loaded', async () => {
            mockGetImages.mockResolvedValue({
                status: 'success',
                message: 'Imagens carregadas com sucesso',
                payload: mockImages,
            })

            render(<GalleryMenu />)

            await waitFor(() => {
                expect(
                    screen.queryByTestId('gallery-menu-loading-spinner'),
                ).not.toBeInTheDocument()
            })
        })
    })

    describe('Data loading', () => {
        it('should load images successfully', async () => {
            mockGetImages.mockResolvedValue({
                status: 'success',
                message: 'Imagens carregadas com sucesso',
                payload: mockImages,
            })

            render(<GalleryMenu />)

            await waitFor(() => {
                expect(mockGetImages).toHaveBeenCalled()
            })

            await waitFor(() => {
                expect(
                    screen.getByTestId('image-button-Image 1'),
                ).toBeInTheDocument()
                expect(
                    screen.getByTestId('image-button-Image 2'),
                ).toBeInTheDocument()
                expect(
                    screen.getByTestId('image-button-Image 3'),
                ).toBeInTheDocument()
            })
        })

        it('should handle error when loading images', async () => {
            mockGetImages.mockResolvedValue({
                status: 'error',
                error: imageErrors.imageNotFound,
            })

            render(<GalleryMenu />)

            await waitFor(() => {
                expect(mockGetImages).toHaveBeenCalled()
            })

            await waitFor(() => {
                expect(
                    screen.queryByTestId('image-button-Image 1'),
                ).not.toBeInTheDocument()
            })
        })

        it('should handle empty images array', async () => {
            mockGetImages.mockResolvedValue({
                status: 'success',
                message: 'Imagens carregadas com sucesso',
                payload: [],
            })

            render(<GalleryMenu />)

            await waitFor(() => {
                expect(
                    screen.queryByTestId('image-button-Image 1'),
                ).not.toBeInTheDocument()
            })
        })

        it('should handle undefined images payload', async () => {
            mockGetImages.mockResolvedValue({
                status: 'success',
                message: 'Imagens carregadas com sucesso',
                payload: undefined as any,
            })

            render(<GalleryMenu />)

            await waitFor(() => {
                expect(
                    screen.queryByTestId('image-button-Image 1'),
                ).not.toBeInTheDocument()
            })
        })
    })

    describe('AddButton functionality', () => {
        it('should render AddButton', async () => {
            mockGetImages.mockResolvedValue({
                status: 'success',
                message: 'Imagens carregadas com sucesso',
                payload: [],
            })

            render(<GalleryMenu />)

            await waitFor(() => {
                const addButton = screen.getByTestId('add-button')
                expect(addButton).toBeInTheDocument()
                expect(addButton).toHaveAttribute(
                    'aria-label',
                    'Adicionar imagem',
                )
            })
        })

        it('should handle AddButton click when no image is selected', async () => {
            mockGetImages.mockResolvedValue({
                status: 'success',
                message: 'Imagens carregadas com sucesso',
                payload: mockImages,
            })

            render(<GalleryMenu />)

            await waitFor(() => {
                const addButton = screen.getByTestId('add-button')
                expect(addButton).toBeDisabled()
            })
        })

        it('should handle AddButton click when image is selected', async () => {
            mockGetImages.mockResolvedValue({
                status: 'success',
                message: 'Imagens carregadas com sucesso',
                payload: mockImages,
            })

            mockSharedMenuData.selectedImageId = '1'

            render(<GalleryMenu />)

            await waitFor(() => {
                const addButton = screen.getByTestId('add-button')
                expect(addButton).not.toBeDisabled()
                fireEvent.click(addButton)
            })

            await waitFor(() => {
                expect(mockDispatch).toHaveBeenCalledWith({
                    type: 'setUi',
                    ui: {
                        itemSelector: null,
                        field: {
                            focus: null,
                        },
                    },
                })
                expect(mockSetSharedMenuData).toHaveBeenCalledWith(
                    'selectedImageId',
                    null,
                )
                expect(mockSetSharedMenuData).toHaveBeenCalledWith(
                    'selectedImagePayload',
                    null,
                )
            })
        })
    })

    describe('Image selection', () => {
        it('should render all images when images array is provided', async () => {
            mockGetImages.mockResolvedValue({
                status: 'success',
                message: 'Imagens carregadas com sucesso',
                payload: mockImages,
            })

            render(<GalleryMenu />)

            await waitFor(() => {
                expect(
                    screen.getByTestId('image-button-Image 1'),
                ).toBeInTheDocument()
                expect(
                    screen.getByTestId('image-button-Image 2'),
                ).toBeInTheDocument()
                expect(
                    screen.getByTestId('image-button-Image 3'),
                ).toBeInTheDocument()
            })
        })

        it('should mark image as selected when imageId matches', async () => {
            mockGetImages.mockResolvedValue({
                status: 'success',
                message: 'Imagens carregadas com sucesso',
                payload: mockImages,
            })

            mockSharedMenuData.selectedImageId = '2'

            render(<GalleryMenu />)

            await waitFor(() => {
                const imageButton1 = screen.getByTestId('image-button-Image 1')
                const imageButton2 = screen.getByTestId('image-button-Image 2')
                const imageButton3 = screen.getByTestId('image-button-Image 3')

                expect(imageButton1).toHaveAttribute('data-selected', 'false')
                expect(imageButton2).toHaveAttribute('data-selected', 'true')
                expect(imageButton3).toHaveAttribute('data-selected', 'false')
            })
        })

        it('should call handleSelectImage with correct imageId when image is clicked', async () => {
            mockGetImages.mockResolvedValue({
                status: 'success',
                message: 'Imagens carregadas com sucesso',
                payload: mockImages,
            })

            render(<GalleryMenu />)

            await waitFor(() => {
                const imageButton = screen.getByTestId('image-button-Image 2')
                fireEvent.click(imageButton)
            })

            await waitFor(() => {
                expect(mockDispatch).toHaveBeenCalledWith({
                    type: 'setUi',
                    ui: {
                        itemSelector: null,
                        field: {
                            focus: null,
                        },
                    },
                })
                expect(mockSetSharedMenuData).toHaveBeenCalledWith(
                    'selectedImageId',
                    '2',
                )
                expect(mockSetSharedMenuData).toHaveBeenCalledWith(
                    'selectedImagePayload',
                    {
                        src: 'https://example.com/image2.jpg',
                        name: 'Image 2',
                    },
                )
            })
        })

        it('should disable selected image button', async () => {
            mockGetImages.mockResolvedValue({
                status: 'success',
                message: 'Imagens carregadas com sucesso',
                payload: mockImages,
            })

            mockSharedMenuData.selectedImageId = '2'

            render(<GalleryMenu />)

            await waitFor(() => {
                const selectedImageButton = screen.getByTestId(
                    'image-button-Image 2',
                )
                expect(selectedImageButton).toBeDisabled()
            })
        })

        it('should handle image selection with empty imageId', async () => {
            mockGetImages.mockResolvedValue({
                status: 'success',
                message: 'Imagens carregadas com sucesso',
                payload: mockImages,
            })

            render(<GalleryMenu />)

            await waitFor(() => {
                const addButton = screen.getByTestId('add-button')
                fireEvent.click(addButton)
            })

            await waitFor(() => {
                expect(mockSetSharedMenuData).toHaveBeenCalledWith(
                    'selectedImageId',
                    null,
                )
                expect(mockSetSharedMenuData).toHaveBeenCalledWith(
                    'selectedImagePayload',
                    null,
                )
            })
        })
    })

    describe('Image button props', () => {
        it('should pass correct props to ImageButton components', async () => {
            mockGetImages.mockResolvedValue({
                status: 'success',
                message: 'Imagens carregadas com sucesso',
                payload: mockImages,
            })

            mockSharedMenuData.selectedImageId = '1'

            render(<GalleryMenu />)

            await waitFor(() => {
                const imageButton = screen.getByTestId('image-button-Image 1')
                expect(imageButton).toHaveAttribute('aria-label', 'Image 1')
                expect(imageButton).toHaveAttribute('data-selected', 'true')
            })
        })

        it('should render image with correct src and alt', async () => {
            mockGetImages.mockResolvedValue({
                status: 'success',
                message: 'Imagens carregadas com sucesso',
                payload: mockImages,
            })

            render(<GalleryMenu />)

            await waitFor(() => {
                const image = screen.getByAltText('Image 1')
                expect(image).toHaveAttribute(
                    'src',
                    'https://example.com/image1.jpg',
                )
            })
        })
    })

    describe('Layout and styling', () => {
        it('should render with correct wrapper classes', async () => {
            mockGetImages.mockResolvedValue({
                status: 'success',
                message: 'Imagens carregadas com sucesso',
                payload: [],
            })

            render(<GalleryMenu />)

            const wrapper = screen.getByText('Galeria').closest('.menu-wrapper')
            expect(wrapper).toBeInTheDocument()
        })

        it('should render scrollable wrapper', async () => {
            mockGetImages.mockResolvedValue({
                status: 'success',
                message: 'Imagens carregadas com sucesso',
                payload: [],
            })

            render(<GalleryMenu />)

            const scrollableWrapper = screen
                .getByText('Galeria')
                .parentElement?.querySelector('.scrollable-wrapper')
            expect(scrollableWrapper).toBeInTheDocument()
        })

        it('should render images container with correct classes', async () => {
            mockGetImages.mockResolvedValue({
                status: 'success',
                message: 'Imagens carregadas com sucesso',
                payload: mockImages,
            })

            render(<GalleryMenu />)

            await waitFor(() => {
                const imagesContainer = screen
                    .getByTestId('image-button-Image 1')
                    .closest('.flex')
                expect(imagesContainer).toHaveClass(
                    'flex',
                    'flex-wrap',
                    'justify-between',
                    'pr-[2px]',
                    'gap-[12px]',
                )
            })
        })
    })

    describe('Edge cases', () => {
        it('should handle undefined images gracefully', async () => {
            mockGetImages.mockResolvedValue({
                status: 'success',
                message: 'Imagens carregadas com sucesso',
                payload: undefined as unknown as IImage[],
            })

            render(<GalleryMenu />)

            await waitFor(() => {
                expect(
                    screen.queryByTestId('image-button-Image 1'),
                ).not.toBeInTheDocument()
            })
        })

        it('should handle empty image name', async () => {
            const imagesWithEmptyName = [
                {
                    _id: '1',
                    name: '',
                    src: 'https://example.com/image.jpg',
                },
            ]

            mockGetImages.mockResolvedValue({
                status: 'success',
                message: 'Imagens carregadas com sucesso',
                payload: imagesWithEmptyName,
            })

            render(<GalleryMenu />)

            await waitFor(() => {
                const imageButton = screen.getByTestId('image-button-')
                expect(imageButton).toBeInTheDocument()
            })
        })

        it('should handle missing image properties', async () => {
            const imagesWithMissingProps = [{ _id: '1', name: 'Test', src: '' }]

            mockGetImages.mockResolvedValue({
                status: 'success',
                message: 'Imagens carregadas com sucesso',
                payload: imagesWithMissingProps,
            })

            render(<GalleryMenu />)

            await waitFor(() => {
                const imageButton = screen.getByTestId('image-button-Test')
                expect(imageButton).toBeInTheDocument()
            })
        })

        it('should handle image not found in selection', async () => {
            mockGetImages.mockResolvedValue({
                status: 'success',
                message: 'Imagens carregadas com sucesso',
                payload: mockImages,
            })

            render(<GalleryMenu />)

            await waitFor(() => {
                const imageButton = screen.getByTestId('image-button-Image 1')
                fireEvent.click(imageButton)
            })

            await waitFor(() => {
                expect(mockSetSharedMenuData).toHaveBeenCalledWith(
                    'selectedImagePayload',
                    {
                        src: 'https://example.com/image1.jpg',
                        name: 'Image 1',
                    },
                )
            })
        })
    })

    describe('Error handling', () => {
        it('should handle network error when loading images', async () => {
            mockGetImages.mockRejectedValue(new Error('Network error'))

            render(<GalleryMenu />)

            await waitFor(() => {
                expect(mockGetImages).toHaveBeenCalled()
            })

            await waitFor(() => {
                expect(
                    screen.queryByTestId('image-button-Image 1'),
                ).not.toBeInTheDocument()
            })
        })

        it('should handle unexpected status response', async () => {
            mockGetImages.mockResolvedValue({
                status: 'unknown' as any,
                message: 'Unexpected response',
                payload: [],
            })

            render(<GalleryMenu />)

            await waitFor(() => {
                expect(mockGetImages).toHaveBeenCalled()
            })

            await waitFor(() => {
                expect(
                    screen.queryByTestId('image-button-Image 1'),
                ).not.toBeInTheDocument()
            })
        })
    })

    describe('GalleryMenuLoading component', () => {
        it('should render loading component with correct structure', () => {
            render(<GalleryMenuLoading />)

            expect(
                screen.getByTestId('gallery-menu-loading'),
            ).toBeInTheDocument()
            expect(screen.getByTestId('menu-title')).toHaveTextContent(
                'Galeria',
            )
            expect(screen.getByTestId('skeleton')).toBeInTheDocument()
        })

        it('should render skeleton with correct classes', () => {
            render(<GalleryMenuLoading />)

            const skeleton = screen.getByTestId('skeleton')
            expect(skeleton).toHaveClass('h-[80px]', 'w-[80px]', 'rounded')
        })

        it('should render with correct wrapper structure', () => {
            render(<GalleryMenuLoading />)

            const wrapper = screen.getByTestId('gallery-menu-loading')
            expect(wrapper).toHaveClass('menu-wrapper')

            const scrollableWrapper = wrapper.querySelector(
                '.scrollable-wrapper',
            )
            expect(scrollableWrapper).toBeInTheDocument()

            const flexContainer = scrollableWrapper?.querySelector('.flex')
            expect(flexContainer).toHaveClass(
                'flex',
                'flex-wrap',
                'justify-between',
                'pr-[2px]',
                'gap-[12px]',
            )
        })
    })

    describe('GalleryMenuError component', () => {
        it('should render error component with correct structure', () => {
            render(<GalleryMenuError />)

            expect(screen.getByTestId('gallery-menu-error')).toBeInTheDocument()
            expect(screen.getByTestId('menu-title')).toHaveTextContent(
                'Galeria',
            )
            expect(screen.getByTestId('alert')).toBeInTheDocument()
        })

        it('should render alert with correct properties', () => {
            render(<GalleryMenuError />)

            const alert = screen.getByTestId('alert')
            expect(alert).toHaveAttribute('data-color', 'danger')
            expect(alert).toHaveClass(
                'w-full',
                'flex-col',
                'align-center',
                'justify-center',
                'gap-2',
            )

            expect(screen.getByTestId('alert-title')).toHaveTextContent(
                'Erro ao carregar imagens',
            )
            expect(screen.getByTestId('alert-description')).toHaveTextContent(
                'Por favor, tente novamente mais tarde.',
            )
        })

        it('should render with correct wrapper structure', () => {
            render(<GalleryMenuError />)

            const wrapper = screen.getByTestId('gallery-menu-error')
            expect(wrapper).toHaveClass('menu-wrapper')

            const scrollableWrapper = wrapper.querySelector(
                '.scrollable-wrapper',
            )
            expect(scrollableWrapper).toBeInTheDocument()

            const flexContainer = scrollableWrapper?.querySelector('.flex')
            expect(flexContainer).toHaveClass(
                'flex',
                'flex-wrap',
                'justify-between',
                'pr-[2px]',
                'gap-[12px]',
            )
        })
    })
})
