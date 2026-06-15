import { describe, it, expect, vi, beforeEach } from 'vitest'
import { imageModels } from './standalone'
import { connectDB } from '@/core/services/mongodb'
import { imagesModel } from './standalone.schemas'
import { imageErrors } from '@/core/controllers/images/images.errors'

vi.mock('@/core/services/mongodb', () => ({
    connectDB: vi.fn(),
}))

vi.mock('./standalone.schemas', () => ({
    imagesModel: {
        find: vi.fn(),
        create: vi.fn(),
        findById: vi.fn(),
    },
}))

// Documento como gravado no Mongo: binário em `data` + `mimeType`.
const makeDoc = (overrides: Record<string, unknown> = {}) => ({
    _id: { toString: () => '123' },
    name: 'Test Image',
    data: 'QUJD',
    mimeType: 'image/jpeg',
    alt: undefined,
    title: undefined,
    ...overrides,
})

// O `src` público é derivado do _id e servido pela rota /api/images/[id].
const expectedResponse = {
    name: 'Test Image',
    src: '/api/images/123',
    alt: undefined,
    title: undefined,
    _id: '123',
}

describe('Standalone: Images', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('getImages', () => {
        it('should return a list of images with served src', async () => {
            vi.mocked(imagesModel.find).mockResolvedValue([makeDoc()])

            const result = await imageModels.getImages()

            expect(connectDB).toHaveBeenCalled()
            expect(imagesModel.find).toHaveBeenCalled()
            expect(result).toEqual([expectedResponse])
        })
    })

    describe('createImage', () => {
        it('should store the base64 binary in Mongo and return served src', async () => {
            vi.mocked(imagesModel.create).mockResolvedValue(
                makeDoc() as never,
            )

            const result = await imageModels.createImage({
                name: 'Test Image',
                src: 'data:image/jpeg;base64,QUJD',
            })

            expect(connectDB).toHaveBeenCalled()
            // base64 e mimeType extraídos do data URL e persistidos.
            expect(imagesModel.create).toHaveBeenCalledWith({
                name: 'Test Image',
                data: 'QUJD',
                mimeType: 'image/jpeg',
                alt: undefined,
                title: undefined,
            })
            expect(result).toEqual(expectedResponse)
        })

        it('should throw an error when image is not created', async () => {
            vi.mocked(imagesModel.create).mockRejectedValue(new Error('Error'))

            await expect(
                imageModels.createImage({
                    name: 'Test Image',
                    src: 'data:image/jpeg;base64,QUJD',
                }),
            ).rejects.toThrow(imageErrors.imageNotCreated)
        })
    })

    describe('getImageById', () => {
        it('should return an image by ID with served src', async () => {
            vi.mocked(imagesModel.findById).mockResolvedValue(makeDoc())

            const result = await imageModels.getImageById('123')

            expect(connectDB).toHaveBeenCalled()
            expect(imagesModel.findById).toHaveBeenCalledWith('123')
            expect(result).toEqual(expectedResponse)
        })

        it('should return empty fields when image does not exist', async () => {
            vi.mocked(imagesModel.findById).mockResolvedValue(null)

            const result = await imageModels.getImageById('non-existent')

            expect(connectDB).toHaveBeenCalled()
            expect(imagesModel.findById).toHaveBeenCalledWith('non-existent')
            expect(result).toEqual({
                name: undefined,
                src: '',
                alt: undefined,
                title: undefined,
                _id: undefined,
            })
        })
    })

    describe('updateImage', () => {
        it('should update an image successfully', async () => {
            const existing = makeDoc({
                save: vi.fn().mockImplementation(function (this: unknown) {
                    return this
                }),
            })
            vi.mocked(imagesModel.findById).mockResolvedValue(existing)

            const result = await imageModels.updateImage({
                _id: '123',
                name: 'Updated Image',
            })

            expect(connectDB).toHaveBeenCalled()
            expect(imagesModel.findById).toHaveBeenCalledWith('123')
            expect(existing.save).toHaveBeenCalled()
            expect(existing.name).toBe('Updated Image')
            expect(result.src).toBe('/api/images/123')
        })

        it('should re-store the binary when a new base64 is provided', async () => {
            const existing = makeDoc({
                save: vi.fn().mockImplementation(function (this: unknown) {
                    return this
                }),
            })
            vi.mocked(imagesModel.findById).mockResolvedValue(existing)

            await imageModels.updateImage({
                _id: '123',
                src: 'data:image/png;base64,WFla',
            })

            expect(existing.data).toBe('WFla')
            expect(existing.mimeType).toBe('image/png')
        })

        it('should throw an error when image does not exist', async () => {
            vi.mocked(imagesModel.findById).mockResolvedValue(null)

            await expect(
                imageModels.updateImage({ _id: '123', name: 'X' }),
            ).rejects.toThrow(imageErrors.imageNotFound)
        })

        it('should throw an error when image is not updated', async () => {
            vi.mocked(imagesModel.findById).mockResolvedValue(
                makeDoc({
                    save: vi.fn().mockRejectedValue(new Error('Error')),
                }),
            )

            await expect(
                imageModels.updateImage({ _id: '123', name: 'X' }),
            ).rejects.toThrow(imageErrors.imageNotUpdated)
        })
    })

    describe('getImageData', () => {
        it('should return the raw binary and mimeType', async () => {
            vi.mocked(imagesModel.findById).mockResolvedValue(makeDoc())

            const result = await imageModels.getImageData('123')

            expect(imagesModel.findById).toHaveBeenCalledWith('123')
            expect(result).toEqual({ data: 'QUJD', mimeType: 'image/jpeg' })
        })

        it('should return null when image does not exist', async () => {
            vi.mocked(imagesModel.findById).mockResolvedValue(null)

            const result = await imageModels.getImageData('non-existent')

            expect(result).toBeNull()
        })
    })
})
