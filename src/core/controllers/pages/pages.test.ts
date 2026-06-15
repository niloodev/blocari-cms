import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
    getPages,
    getPageBySlug,
    getPageById,
    createPage,
    updatePage,
    deletePage,
} from './pages'
import {
    getPages as getPagesModel,
    createPage as createPageModel,
    getPageBySlug as getPageBySlugModel,
    updatePage as updatePageModel,
    getPageById as getPageByIdModel,
    deletePage as deletePageModel,
} from '@/core/models/pages'
import { pageErrors } from './pages.errors'
import { IPage, IPageResponse } from '@/core/models/pages'
import { Data } from '@measured/puck'

vi.mock('@/core/models/pages', () => ({
    getPages: vi.fn(),
    createPage: vi.fn(),
    getPageBySlug: vi.fn(),
    updatePage: vi.fn(),
    getPageById: vi.fn(),
    deletePage: vi.fn(),
}))

const mockPageResponse: IPageResponse = {
    _id: '1',
    title: 'Página Teste',
    slug: '/pagina-teste',
    content: {} as Data,
    dynamicAdaptor: '',
    description: 'Descrição da página teste',
    canonical: 'https://www.google.com',
    opengraphImage: 'https://www.google.com',
}

const mockPageInput: IPage = {
    title: 'Página Teste',
    slug: '/pagina-teste',
    content: {} as Data,
    description: 'Descrição da página teste',
    canonical: 'https://www.google.com',
    opengraphImage: 'https://www.google.com',
    dynamicAdaptor: '',
}

describe('Controllers: Pages', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('getPages', () => {
        it('should return all pages successfully when no filter is provided', async () => {
            const mockPages = [mockPageResponse]
            vi.mocked(getPagesModel).mockResolvedValue(mockPages)

            const result = await getPages()

            expect(result.status).toBe('success')
            if (result.status === 'success') {
                expect(result.message).toBe('Páginas carregadas com sucesso')
                expect(result.payload).toEqual(mockPages)
            }
            expect(getPagesModel).toHaveBeenCalledWith(undefined, undefined)
        })

        it('should return dynamic pages successfully when isDynamic is true', async () => {
            const mockPages = [mockPageResponse]
            vi.mocked(getPagesModel).mockResolvedValue(mockPages)

            const result = await getPages(true)

            expect(result.status).toBe('success')
            if (result.status === 'success') {
                expect(result.message).toBe('Páginas carregadas com sucesso')
                expect(result.payload).toEqual(mockPages)
            }
            expect(getPagesModel).toHaveBeenCalledWith(true, undefined)
        })

        it('should return static pages successfully when isDynamic is false', async () => {
            const mockPages = [mockPageResponse]
            vi.mocked(getPagesModel).mockResolvedValue(mockPages)

            const result = await getPages(false)

            expect(result.status).toBe('success')
            if (result.status === 'success') {
                expect(result.message).toBe('Páginas carregadas com sucesso')
                expect(result.payload).toEqual(mockPages)
            }
            expect(getPagesModel).toHaveBeenCalledWith(false, undefined)
        })
    })

    describe('getPageBySlug', () => {
        it('should return error when slug is not provided', async () => {
            const result = await getPageBySlug('')

            expect(result.status).toBe('error')
            if (result.status === 'error') {
                expect(result.error).toBe(pageErrors.slugIsRequired)
            }
        })

        it('should return page by slug successfully', async () => {
            vi.mocked(getPageBySlugModel).mockResolvedValue(mockPageResponse)

            const result = await getPageBySlug('/pagina-teste')

            expect(result.status).toBe('success')
            if (result.status === 'success') {
                expect(result.message).toBe('Página carregada com sucesso')
                expect(result.payload).toEqual(mockPageResponse)
            }
            expect(getPageBySlugModel).toHaveBeenCalledWith('/pagina-teste')
        })
    })

    describe('getPageById', () => {
        it('should return error when id is not provided', async () => {
            const result = await getPageById('')

            expect(result.status).toBe('error')
            if (result.status === 'error') {
                expect(result.error).toBe(pageErrors.idIsRequired)
            }
        })

        it('should return page by id successfully', async () => {
            vi.mocked(getPageByIdModel).mockResolvedValue(mockPageResponse)

            const result = await getPageById('1')

            expect(result.status).toBe('success')
            if (result.status === 'success') {
                expect(result.message).toBe('Página carregada com sucesso')
                expect(result.payload).toEqual(mockPageResponse)
            }
            expect(getPageByIdModel).toHaveBeenCalledWith('1')
        })
    })

    describe('createPage', () => {
        it('should return error when page is not valid', async () => {
            const invalidPage = { title: 'Invalid' } as IPage
            const result = await createPage(invalidPage)

            expect(result.status).toBe('error')
            if (result.status === 'error') {
                expect(result.error).toBe(pageErrors.pageNotValid)
            }
        })

        it('should create page successfully', async () => {
            vi.mocked(createPageModel).mockResolvedValue(mockPageResponse)

            const result = await createPage(mockPageInput)

            expect(result.status).toBe('success')
            if (result.status === 'success') {
                expect(result.message).toBe('Página criada com sucesso')
                expect(result.payload).toEqual(mockPageResponse)
            }
            expect(createPageModel).toHaveBeenCalledWith(mockPageInput)
        })

        it('should return error when slug already exists', async () => {
            vi.mocked(createPageModel).mockRejectedValue(
                new Error(pageErrors.slugAlreadyExists),
            )

            const result = await createPage(mockPageInput)

            expect(result.status).toBe('error')
            if (result.status === 'error') {
                expect(result.error).toBe(pageErrors.slugAlreadyExists)
            }
        })

        it('should return error when page is not created', async () => {
            vi.mocked(createPageModel).mockRejectedValue(new Error('Error'))

            try {
                await createPage(mockPageInput)
            } catch (error) {
                expect(error).toBeInstanceOf(Error)
            }
        })
    })

    describe('updatePage', () => {
        it('should return error when id is not provided', async () => {
            const pageWithoutId = { ...mockPageInput }
            const result = await updatePage(pageWithoutId)

            expect(result.status).toBe('error')
            if (result.status === 'error') {
                expect(result.error).toBe(pageErrors.idIsRequired)
            }
        })

        it('should return error when page is not valid', async () => {
            const invalidPage = { _id: '1', title: 'Invalid' } as IPage & {
                _id: string
            }
            const result = await updatePage(invalidPage)

            expect(result.status).toBe('error')
            if (result.status === 'error') {
                expect(result.error).toBe(pageErrors.pageNotValid)
            }
        })

        it('should update page successfully', async () => {
            vi.mocked(updatePageModel).mockResolvedValue(mockPageResponse)

            const result = await updatePage(mockPageResponse)

            expect(result.status).toBe('success')
            if (result.status === 'success') {
                expect(result.message).toBe('Página atualizada com sucesso')
                expect(result.payload).toEqual(mockPageResponse)
            }
            expect(updatePageModel).toHaveBeenCalledWith(mockPageResponse)
        })

        it('should return error when slug already exists', async () => {
            vi.mocked(updatePageModel).mockRejectedValue(
                new Error(pageErrors.slugAlreadyExists),
            )

            const result = await updatePage(mockPageResponse)

            expect(result.status).toBe('error')
            if (result.status === 'error') {
                expect(result.error).toBe(pageErrors.slugAlreadyExists)
            }
        })

        it('should return error when page is not updated', async () => {
            vi.mocked(updatePageModel).mockRejectedValue(new Error('Error'))

            try {
                await updatePage(mockPageResponse)
            } catch (error) {
                expect(error).toBeInstanceOf(Error)
            }
        })
    })

    describe('deletePage', () => {
        it('should return error when id is not provided', async () => {
            const result = await deletePage('')

            expect(result.status).toBe('error')
            if (result.status === 'error') {
                expect(result.error).toBe(pageErrors.idIsRequired)
            }
        })

        it('should delete page successfully', async () => {
            vi.mocked(deletePageModel).mockResolvedValue(mockPageResponse)

            const result = await deletePage('1')

            expect(result.status).toBe('success')
            if (result.status === 'success') {
                expect(result.message).toBe('Página deletada com sucesso')
                expect(result.payload).toEqual(mockPageResponse)
            }
            expect(deletePageModel).toHaveBeenCalledWith('1')
        })
    })
})
