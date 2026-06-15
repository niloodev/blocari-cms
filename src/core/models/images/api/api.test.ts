import { describe, it, expect, vi, beforeEach } from 'vitest'
import { imageModels } from './api'

describe('API: Images', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        vi.spyOn(console, 'log').mockImplementation(() => {})
    })

    describe('getImages', () => {
        it('should return an empty array and log message', async () => {
            const result = await imageModels.getImages()

            expect(console.log).toHaveBeenCalledWith('API Images Fetched')
            expect(result).toEqual([])
        })
    })

    describe('createImage', () => {
        it('should return mock image and log message', async () => {
            const mockImage = {
                name: 'teste',
                src: 'https://example.com/teste.jpg',
                _id: '123',
            }

            const result = await imageModels.createImage(mockImage)

            expect(console.log).toHaveBeenCalledWith('API Image Created')
            expect(result).toEqual(mockImage)
        })
    })

    describe('getImageById', () => {
        it('should return mock image and log message', async () => {
            const mockImage = {
                name: 'teste',
                src: 'https://example.com/teste.jpg',
                _id: '123',
            }

            const result = await imageModels.getImageById('123')

            expect(console.log).toHaveBeenCalledWith('API Image Fetched')
            expect(result).toEqual(mockImage)
        })
    })

    describe('updateImage', () => {
        it('should return mock image and log message', async () => {
            const mockImage = {
                name: 'teste',
                src: 'https://example.com/teste.jpg',
                _id: '123',
            }

            const result = await imageModels.updateImage(mockImage)

            expect(console.log).toHaveBeenCalledWith('API Image Updated')
            expect(result).toEqual(mockImage)
        })
    })
})
