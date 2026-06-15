import { revalidatePath } from 'next/cache'
import { IPage } from '@/core/models/pages'

type RevalidatablePage = Pick<IPage, 'slug' | 'dynamicAdaptor'>

export const revalidatePages = (...pages: RevalidatablePage[]): void => {
    if (pages.some(page => page.dynamicAdaptor)) {
        revalidatePath('/', 'layout')
        return
    }

    const slugs = new Set(pages.map(page => page.slug).filter(Boolean))
    slugs.forEach(slug => revalidatePath(slug))
}
