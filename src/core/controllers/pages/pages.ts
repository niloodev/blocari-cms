'use server'

import { pageSchema } from '@/core/models/pages/pages.schemas'
import { IPageController } from './pages.types'
import {
    getPages as getPagesModel,
    createPage as createPageModel,
    getPageBySlug as getPageBySlugModel,
    updatePage as updatePageModel,
    getPageById as getPageByIdModel,
    deletePage as deletePageModel,
} from '@/core/models/pages'
import { pageErrors } from './pages.errors'
import { revalidatePages } from './pages.utils'

export const getPages: IPageController['getPages'] = async (
    isDynamic,
    title,
) => {
    const pages = await getPagesModel(isDynamic, title)

    return {
        status: 'success',
        message: 'Páginas carregadas com sucesso',
        payload: pages,
    }
}

export const getPageBySlug: IPageController['getPageBySlug'] = async slug => {
    if (!slug) return { status: 'error', error: pageErrors.slugIsRequired }

    const page = await getPageBySlugModel(slug)
    return {
        status: 'success',
        message: 'Página carregada com sucesso',
        payload: page,
    }
}

export const getPageById: IPageController['getPageById'] = async id => {
    if (!id) return { status: 'error', error: pageErrors.idIsRequired }

    const page = await getPageByIdModel(id)
    return {
        status: 'success',
        message: 'Página carregada com sucesso',
        payload: page,
    }
}

export const createPage: IPageController['createPage'] = async page => {
    if (!pageSchema.safeParse(page).success)
        return { status: 'error', error: pageErrors.pageNotValid }

    try {
        const newPage = await createPageModel(page)
        revalidatePages(newPage)
        return {
            status: 'success',
            message: 'Página criada com sucesso',
            payload: newPage,
        }
    } catch (error) {
        if ((error as Error)?.message === pageErrors.slugAlreadyExists)
            return { status: 'error', error: pageErrors.slugAlreadyExists }
        throw error
    }
}

export const updatePage: IPageController['updatePage'] = async page => {
    if (!page._id) return { status: 'error', error: pageErrors.idIsRequired }
    if (!pageSchema.safeParse(page).success)
        return { status: 'error', error: pageErrors.pageNotValid }

    try {
        const previousPage = await getPageByIdModel(page._id)
        const updatedPage = await updatePageModel(page)
        revalidatePages(previousPage, updatedPage)
        return {
            status: 'success',
            message: 'Página atualizada com sucesso',
            payload: updatedPage,
        }
    } catch (error) {
        if ((error as Error)?.message === pageErrors.slugAlreadyExists)
            return { status: 'error', error: pageErrors.slugAlreadyExists }
        throw error
    }
}

export const deletePage: IPageController['deletePage'] = async id => {
    if (!id) return { status: 'error', error: pageErrors.idIsRequired }

    const deletedPage = await deletePageModel(id)
    revalidatePages(deletedPage)
    return {
        status: 'success',
        message: 'Página deletada com sucesso',
        payload: deletedPage,
    }
}
