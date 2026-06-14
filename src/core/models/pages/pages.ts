import { IPageModels } from './pages.types'
import { pageModels as StandalonePageModels } from './standalone'
import { pageModels as ApiPageModels } from './api'
import { typeSwitcher } from '@/core/tools'

export const pageModels = typeSwitcher<IPageModels>({
    switch: {
        standalone: StandalonePageModels,
        api: ApiPageModels,
    },
})

export const getPages = pageModels.getPages
export const createPage = pageModels.createPage
export const getPageBySlug = pageModels.getPageBySlug
export const getPageById = pageModels.getPageById
export const updatePage = pageModels.updatePage
