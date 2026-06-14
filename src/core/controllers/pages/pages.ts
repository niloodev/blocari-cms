'use server'

import { pageSchema } from '@/core/models/pages/pages.schemas'
import { IPageController } from './pages.types'
import {
    getPages as getPagesModel,
    createPage as createPageModel,
    getPageBySlug as getPageBySlugModel,
    updatePage as updatePageModel,
    getPageById as getPageByIdModel,
} from '@/core/models/pages'
import { pageErrors } from './pages.errors'

export const getPages: IPageController['getPages'] = async () => {
    const pages = await getPagesModel()

    return { message: 'Páginas carregadas com sucesso', payload: pages }
}

export const getPageBySlug: IPageController['getPageBySlug'] = async slug => {
    if (!slug) return { error: pageErrors.slugIsRequired }

    const page = await getPageBySlugModel(slug)
    return { message: 'Página carregada com sucesso', payload: page }
}

export const getPageById: IPageController['getPageById'] = async id => {
    if (!id) return { error: pageErrors.idIsRequired }

    const page = await getPageByIdModel(id)
    return { message: 'Página carregada com sucesso', payload: page }
}

export const createPage: IPageController['createPage'] = async page => {
    if (!pageSchema.safeParse(page).success)
        return { error: pageErrors.pageNotValid }

    try {
        const newPage = await createPageModel(page)
        return { message: 'Página criada com sucesso', payload: newPage }
    } catch (error) {
        if (error instanceof Error)
            if (error.message === pageErrors.slugAlreadyExists)
                return { error: pageErrors.slugAlreadyExists }
        throw error
    }
}

export const updatePage: IPageController['updatePage'] = async page => {
    if (!page._id) return { error: pageErrors.idIsRequired }
    if (!pageSchema.safeParse(page).success)
        return { error: pageErrors.pageNotValid }

    try {
        const updatedPage = await updatePageModel(page)
        return {
            message: 'Página atualizada com sucesso',
            payload: updatedPage,
        }
    } catch (error) {
        if (error instanceof Error)
            if (error.message === pageErrors.slugAlreadyExists)
                return { error: pageErrors.slugAlreadyExists }
        throw error
    }
}
