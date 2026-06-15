import { IPage } from '@/core/models/pages'
import { adapters } from '@/adapters'

export type VerifySlugResponse = {
    page: IPage
    dynamicParams: Record<string, string> | null
    dynamicAdaptor: keyof typeof adapters
}
