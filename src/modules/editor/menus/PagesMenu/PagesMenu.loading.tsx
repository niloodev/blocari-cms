import { MenuTitle } from '@/modules/editor/components/atoms'
import { Skeleton } from '@heroui/react'

export function PagesMenuLoading() {
    return (
        <div className="menu-wrapper">
            <MenuTitle>Páginas</MenuTitle>
            <div className="scrollable-wrapper">
                <div className="flex flex-wrap justify-between pr-[2px] gap-[12px]">
                    <Skeleton className="h-[80px] w-[80px] rounded" />
                </div>
            </div>
        </div>
    )
}
