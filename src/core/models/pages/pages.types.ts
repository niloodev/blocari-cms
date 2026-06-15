import { pageSchema } from './pages.schemas'
import { z } from 'zod'

export type IPage = z.infer<typeof pageSchema>

export type IPageResponse = IPage & { _id: string }
export interface IPageModels {
    getPages: (isDynamic?: boolean, title?: string) => Promise<IPageResponse[]>
    getPageBySlug: (slug: string) => Promise<IPageResponse>
    getPageById: (id: string) => Promise<IPageResponse>
    createPage: (page: IPage) => Promise<IPageResponse>
    updatePage: (page: Partial<IPage>) => Promise<IPageResponse>
    deletePage: (id: string) => Promise<IPageResponse>
}
