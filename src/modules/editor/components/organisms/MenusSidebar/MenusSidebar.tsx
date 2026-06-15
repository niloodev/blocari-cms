'use client'

import { MenuSelector } from '@/modules/editor/components/molecules'
import { useMenusSidebar } from './MenusSidebar.hook'

export function MenusSidebar() {
    const { Menu } = useMenusSidebar()

    return (
        <aside className="min-w-[265px] flex bg-content1 min-h-full max-h-full border-[1.5px] border-solid border-content2">
            <MenuSelector />
            <article className="flex flex-col gap-[18px] p-[18px] min-w-[215px] max-h-full overflow-hidden w-[209px] border-r-[1.5px] border-t-[1.5px] border-solid border-content2">
                <Menu />
            </article>
        </aside>
    )
}
