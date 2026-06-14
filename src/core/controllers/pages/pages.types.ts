import { IPage } from '@/core/models/pages'
import { BaseError, BaseResponse } from '../controllers.types'
import { pageErrors } from './pages.errors'

type PageErrorsKeys = keyof typeof pageErrors
export interface IPageController {
    getPages: () => Promise<
        BaseResponse<IPage[]> | BaseError<(typeof pageErrors)[PageErrorsKeys]>
    >
    getPageBySlug: (
        slug: string,
    ) => Promise<
        BaseResponse<IPage> | BaseError<(typeof pageErrors)[PageErrorsKeys]>
    >
    getPageById: (
        id: string,
    ) => Promise<
        BaseResponse<IPage> | BaseError<(typeof pageErrors)[PageErrorsKeys]>
    >
    createPage: (
        page: IPage,
    ) => Promise<
        BaseResponse<IPage> | BaseError<(typeof pageErrors)[PageErrorsKeys]>
    >
    updatePage: (
        page: IPage,
    ) => Promise<
        BaseResponse<IPage> | BaseError<(typeof pageErrors)[PageErrorsKeys]>
    >
}
