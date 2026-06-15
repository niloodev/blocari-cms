import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getImages, getImageById, createImage, updateImage } from './images'
import { imageErrors } from './images.errors'

vi.mock('@/core/models/images', () => ({
    getImages: vi.fn(),
    getImageById: vi.fn(),
    createImage: vi.fn(),
    updateImage: vi.fn(),
}))

vi.mock('@/core/models/images/images.schemas', () => ({
    imageSchema: {
        safeParse: vi.fn(),
    },
}))

import {
    getImages as getImagesModel,
    getImageById as getImageByIdModel,
    createImage as createImageModel,
    updateImage as updateImageModel,
} from '@/core/models/images'
import { imageSchema } from '@/core/models/images/images.schemas'

const mockImageModels = {
    getImages: vi.mocked(getImagesModel),
    getImageById: vi.mocked(getImageByIdModel),
    createImage: vi.mocked(createImageModel),
    updateImage: vi.mocked(updateImageModel),
}

const mockSchema = {
    imageSchema: vi.mocked(imageSchema),
}

describe('Controllers: Images', () => {
    const mockImage = {
        _id: '123',
        name: 'Test Image',
        src: '/api/images/123',
    }

    const mockBase64Image = {
        _id: '123',
        name: 'Test Image',
        src: 'data:image/jpeg;base64,/9j/4AAQSkZJRg==',
    }

    beforeEach(() => {
        vi.clearAllMocks()

        mockSchema.imageSchema.safeParse.mockReturnValue({
            success: true,
            data: mockImage,
        })
    })

    describe('getImages', () => {
        it('should return success response with images', async () => {
            const mockImages = [mockImage]
            mockImageModels.getImages.mockResolvedValue(mockImages)

            const result = await getImages()

            expect(mockImageModels.getImages).toHaveBeenCalled()
            expect(result).toEqual({
                status: 'success',
                message: 'Imagens carregadas com sucesso',
                payload: mockImages,
            })
        })

        it('should throw error when images not found', async () => {
            mockImageModels.getImages.mockRejectedValue(
                new Error('Database error'),
            )

            await expect(getImages()).rejects.toThrow('Database error')
        })
    })

    describe('getImageById', () => {
        it('should return success response with image', async () => {
            mockImageModels.getImageById.mockResolvedValue(mockImage)

            const result = await getImageById('123')

            expect(mockImageModels.getImageById).toHaveBeenCalledWith('123')
            expect(result).toEqual({
                status: 'success',
                message: 'Imagem carregada com sucesso',
                payload: mockImage,
            })
        })

        it('should return error response when id is not provided', async () => {
            const result = await getImageById('')

            expect(result).toEqual({
                status: 'error',
                error: imageErrors.idIsRequired,
            })
        })

        it('should return success response even when image is undefined', async () => {
            mockImageModels.getImageById.mockResolvedValue(undefined as any)

            const result = await getImageById('123')

            expect(result).toEqual({
                status: 'success',
                message: 'Imagem carregada com sucesso',
                payload: undefined,
            })
        })
    })

    describe('createImage', () => {
        it('should create the image and return success response', async () => {
            mockImageModels.createImage.mockResolvedValue(mockImage)

            const result = await createImage(mockBase64Image)

            // O controller delega ao model, que persiste o binário no Mongo.
            expect(mockImageModels.createImage).toHaveBeenCalledWith(
                mockBase64Image,
            )
            expect(result).toEqual({
                status: 'success',
                message: 'Imagem criada com sucesso',
                payload: mockImage,
            })
        })

        it('should return error response when image data is invalid', async () => {
            mockSchema.imageSchema.safeParse.mockReturnValue({
                success: false,
                error: {} as any,
            })

            const result = await createImage(mockImage)

            expect(result).toEqual({
                status: 'error',
                error: imageErrors.imageNotValid,
            })
        })

        it('should propagate error when image creation fails', async () => {
            mockImageModels.createImage.mockRejectedValue(
                new Error('Database error'),
            )

            await expect(createImage(mockBase64Image)).rejects.toThrow(
                'Database error',
            )
        })
    })

    describe('updateImage', () => {
        it('should return success response with updated image', async () => {
            mockImageModels.updateImage.mockResolvedValue(mockImage)

            const result = await updateImage(mockImage)

            expect(mockImageModels.updateImage).toHaveBeenCalledWith(mockImage)
            expect(result).toEqual({
                status: 'success',
                message: 'Imagem atualizada com sucesso',
                payload: mockImage,
            })
        })

        it('should return error response when id is not provided', async () => {
            const imageWithoutId = {
                name: 'Test',
                src: '/api/images/123',
            }

            const result = await updateImage(imageWithoutId)

            expect(result).toEqual({
                status: 'error',
                error: imageErrors.idIsRequired,
            })
        })

        it('should return error response when image data is invalid', async () => {
            mockSchema.imageSchema.safeParse.mockReturnValue({
                success: false,
                error: {} as any,
            })

            const result = await updateImage(mockImage)

            expect(result).toEqual({
                status: 'error',
                error: imageErrors.imageNotValid,
            })
        })

        it('should propagate error when image update fails', async () => {
            mockImageModels.updateImage.mockRejectedValue(
                new Error('Database error'),
            )

            await expect(updateImage(mockImage)).rejects.toThrow(
                'Database error',
            )
        })
    })
})
