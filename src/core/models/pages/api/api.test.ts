import { describe, it, expect } from 'vitest'
import { pageModels } from './api'
import { Data } from '@measured/puck'
import { IPage } from '../pages.types'

const mockPageResponse = {
    title: 'teste',
    slug: '/teste',
    content: {} as Data,
    name: 'teste',
    _id: '123',
    dynamicAdaptor: 'products',
}

const mockBasicPageResponse = {
    title: 'teste',
    slug: '/teste',
    content: {} as Data,
    _id: '123',
    dynamicAdaptor: 'products',
}

const mockPageInput: IPage = {
    title: 'teste',
    slug: '/teste',
    content: {} as Data,
    dynamicAdaptor: 'products',
}

describe('API: Pages', () => {
    describe('getPages', () => {
        it('should return an empty array of pages when no filter is provided', async () => {
            const result = await pageModels.getPages()
            expect(result).toEqual([])
        })

        it('should return an empty array of dynamic pages when isDynamic is true', async () => {
            const result = await pageModels.getPages(true)
            expect(result).toEqual([])
        })

        it('should return an empty array of static pages when isDynamic is false', async () => {
            const result = await pageModels.getPages(false)
            expect(result).toEqual([])
        })
    })

    describe('createPage', () => {
        it('should create a new page with basic information', async () => {
            const result = await pageModels.createPage(mockPageInput)
            expect(result).toEqual(mockBasicPageResponse)
        })
    })

    describe('getPageBySlug', () => {
        it('should return a page by its slug', async () => {
            const result = await pageModels.getPageBySlug('/teste')
            expect(result).toEqual(mockPageResponse)
        })
    })

    describe('getPageById', () => {
        it('should return a page by its id', async () => {
            const result = await pageModels.getPageById('123')
            expect(result).toEqual(mockPageResponse)
        })
    })

    describe('updatePage', () => {
        it('should update a page and return the updated data', async () => {
            const result = await pageModels.updatePage(mockPageInput)
            expect(result).toEqual(mockPageResponse)
        })
    })

    describe('deletePage', () => {
        it('should delete a page and return the deleted page data', async () => {
            const result = await pageModels.deletePage('123')
            expect(result).toEqual(mockPageResponse)
        })
    })
})
