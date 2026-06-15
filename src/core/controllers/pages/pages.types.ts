import { IPage } from '@/core/models/pages'
import { BaseError, BaseResponse } from '../controllers.types'
import { pageErrors } from './pages.errors'

type PageErrorsValues = (typeof pageErrors)[keyof typeof pageErrors]

export type IPageControllerResponse<T> =
    | BaseResponse<T>
    | BaseError<PageErrorsValues>

export interface IPageController {
    getPages: (
        isDynamic?: boolean,
        title?: string,
    ) => Promise<IPageControllerResponse<IPage[]>>
    getPageBySlug: (slug: string) => Promise<IPageControllerResponse<IPage>>
    getPageById: (id: string) => Promise<IPageControllerResponse<IPage>>
    createPage: (page: IPage) => Promise<IPageControllerResponse<IPage>>
    updatePage: (page: IPage) => Promise<IPageControllerResponse<IPage>>
    deletePage: (id: string) => Promise<IPageControllerResponse<IPage>>
}
