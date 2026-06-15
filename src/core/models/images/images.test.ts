import { imageModels } from './images'

describe('Models: Images', () => {
    it('should return the correct module', () => {
        const results = Object.keys(imageModels)

        expect(results).toBeTruthy()
        expect(results).toBeDefined()
        expect(results).toBeInstanceOf(Array)
        expect(results).toEqual([
            'getImages',
            'createImage',
            'getImageById',
            'updateImage',
            'getImageData',
        ])
    })
})
