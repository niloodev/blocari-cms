import { pageModels } from './pages'

describe('Models: Pages', () => {
    it('should return the correct module', () => {
        const results = Object.keys(pageModels)

        expect(results).toBeTruthy()
        expect(results).toBeDefined()
        expect(results).toBeInstanceOf(Array)
        expect(results).toEqual([
            'getPages',
            'createPage',
            'getPageBySlug',
            'getPageById',
            'updatePage',
            'deletePage',
        ])
    })
})
