import { describe, it, expect, vi, beforeEach } from 'vitest'
import { pageModels } from './standalone'
import { connectDB } from '@/core/services/mongodb'
import { pagesModel } from './standalone.schemas'
import { pageErrors } from '@/core/controllers/pages/pages.errors'
import { mongo, HydratedDocument } from 'mongoose'
import { Data } from '@measured/puck'

vi.mock('@/core/services/mongodb', () => ({
    connectDB: vi.fn(),
}))

vi.mock('./standalone.schemas', () => ({
    pagesModel: {
        find: vi.fn(),
        create: vi.fn(),
        findOne: vi.fn(),
        findById: vi.fn(),
        findByIdAndDelete: vi.fn(),
    },
}))

describe('Standalone: Pages', () => {
    const mockContent: Data = {
        root: {},
        content: [],
        zones: {},
    }

    const mockPage = {
        _id: '123',
        title: 'Test Page',
        slug: 'test-page',
        content: mockContent,
        dynamicAdaptor: 'products' as const,
    }

    type MockDocument = HydratedDocument<typeof mockPage>

    const mockMongoPage: MockDocument = {
        ...mockPage,
        _id: { toString: () => '123' },
    } as MockDocument

    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('getPages', () => {
        it('should return a list of pages when no filter is provided', async () => {
            const mockPages = [mockMongoPage]
            vi.mocked(pagesModel.find).mockResolvedValue(mockPages)

            const result = await pageModels.getPages()

            expect(connectDB).toHaveBeenCalled()
            expect(pagesModel.find).toHaveBeenCalledWith({})
            expect(result).toEqual([mockPage])
        })

        it('should return only dynamic pages when isDynamic is true', async () => {
            const mockPages = [mockMongoPage]
            vi.mocked(pagesModel.find).mockResolvedValue(mockPages)

            const result = await pageModels.getPages(true)

            expect(connectDB).toHaveBeenCalled()
            expect(pagesModel.find).toHaveBeenCalledWith({
                dynamicAdaptor: { $ne: '' },
            })
            expect(result).toEqual([mockPage])
        })

        it('should return only static pages when isDynamic is false', async () => {
            const mockPages = [mockMongoPage]
            vi.mocked(pagesModel.find).mockResolvedValue(mockPages)

            const result = await pageModels.getPages(false)

            expect(connectDB).toHaveBeenCalled()
            expect(pagesModel.find).toHaveBeenCalledWith({ dynamicAdaptor: '' })
            expect(result).toEqual([mockPage])
        })
    })

    describe('createPage', () => {
        it('should create a new page successfully', async () => {
            vi.mocked(pagesModel.create).mockResolvedValue(
                mockMongoPage as unknown as Array<MockDocument>,
            )

            const result = await pageModels.createPage(mockPage)

            expect(connectDB).toHaveBeenCalled()
            expect(pagesModel.create).toHaveBeenCalledWith(mockPage)
            expect(result).toEqual(mockPage)
        })

        it('should throw an error when slug already exists', async () => {
            const mongoError = new mongo.MongoServerError({
                message: 'duplicate key error',
                code: 11000,
            })
            vi.mocked(pagesModel.create).mockRejectedValue(mongoError)

            await expect(pageModels.createPage(mockPage)).rejects.toThrow(
                pageErrors.slugAlreadyExists,
            )
        })

        it('should throw an error when page is not created', async () => {
            vi.mocked(pagesModel.create).mockRejectedValue(new Error('Error'))

            await expect(pageModels.createPage(mockPage)).rejects.toThrow(
                pageErrors.pageNotCreated,
            )
        })
    })

    describe('getPageBySlug', () => {
        it('should return a page by slug', async () => {
            vi.mocked(pagesModel.findOne).mockResolvedValue(mockMongoPage)

            const result = await pageModels.getPageBySlug('test-page')

            expect(connectDB).toHaveBeenCalled()
            expect(pagesModel.findOne).toHaveBeenCalledWith({
                slug: 'test-page',
            })
            expect(result).toEqual(mockPage)
        })

        it('should return undefined when page does not exist', async () => {
            vi.mocked(pagesModel.findOne).mockResolvedValue(null)

            const result = await pageModels.getPageBySlug('non-existent')

            expect(connectDB).toHaveBeenCalled()
            expect(pagesModel.findOne).toHaveBeenCalledWith({
                slug: 'non-existent',
            })
            expect(result).toEqual({
                title: undefined,
                slug: undefined,
                content: undefined,
                _id: undefined,
            })
        })
    })

    describe('getPageById', () => {
        it('should return a page by ID', async () => {
            vi.mocked(pagesModel.findById).mockResolvedValue(mockMongoPage)

            const result = await pageModels.getPageById('123')

            expect(connectDB).toHaveBeenCalled()
            expect(pagesModel.findById).toHaveBeenCalledWith('123')
            expect(result).toEqual(mockPage)
        })

        it('should return undefined when page does not exist', async () => {
            vi.mocked(pagesModel.findById).mockResolvedValue(null)

            const result = await pageModels.getPageById('non-existent')

            expect(connectDB).toHaveBeenCalled()
            expect(pagesModel.findById).toHaveBeenCalledWith('non-existent')
            expect(result).toEqual({
                title: undefined,
                slug: undefined,
                content: undefined,
                _id: undefined,
            })
        })
    })

    describe('updatePage', () => {
        it('should update a page successfully', async () => {
            const mockExistingPage = {
                ...mockMongoPage,
                save: vi.fn().mockResolvedValue(mockMongoPage),
            }

            vi.mocked(pagesModel.findById).mockResolvedValue(mockExistingPage)

            const result = await pageModels.updatePage(mockPage)

            expect(connectDB).toHaveBeenCalled()
            expect(pagesModel.findById).toHaveBeenCalledWith('123')
            expect(mockExistingPage.save).toHaveBeenCalled()
            expect(result).toEqual(mockPage)
        })

        it('should throw an error when page does not exist', async () => {
            vi.mocked(pagesModel.findById).mockResolvedValue(null)

            await expect(pageModels.updatePage(mockPage)).rejects.toThrow(
                pageErrors.pageNotFound,
            )
        })

        it('should throw an error when slug already exists', async () => {
            const mockExistingPage = {
                ...mockMongoPage,
                save: vi.fn().mockRejectedValue(
                    new mongo.MongoServerError({
                        message: 'duplicate key error',
                        code: 11000,
                    }),
                ),
            }

            vi.mocked(pagesModel.findById).mockResolvedValue(mockExistingPage)

            await expect(pageModels.updatePage(mockPage)).rejects.toThrow(
                pageErrors.slugAlreadyExists,
            )
        })

        it('should throw an error when page is not updated', async () => {
            vi.mocked(pagesModel.findById).mockResolvedValue({
                save: vi.fn().mockRejectedValue(new Error('Error')),
            })

            await expect(pageModels.updatePage(mockPage)).rejects.toThrow(
                pageErrors.pageNotUpdated,
            )
        })
    })

    describe('deletePage', () => {
        it('should delete a page successfully', async () => {
            vi.mocked(pagesModel.findByIdAndDelete).mockResolvedValue(
                mockMongoPage,
            )

            const result = await pageModels.deletePage('123')

            expect(connectDB).toHaveBeenCalled()
            expect(pagesModel.findByIdAndDelete).toHaveBeenCalledWith('123')
            expect(result).toEqual(mockPage)
        })

        it('should return undefined when page does not exist', async () => {
            vi.mocked(pagesModel.findByIdAndDelete).mockResolvedValue(null)

            const result = await pageModels.deletePage('non-existent')

            expect(connectDB).toHaveBeenCalled()
            expect(pagesModel.findByIdAndDelete).toHaveBeenCalledWith(
                'non-existent',
            )
            expect(result).toEqual({
                title: undefined,
                slug: undefined,
                content: undefined,
                _id: undefined,
            })
        })
    })
})
