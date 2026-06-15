import { MenuTitle } from '@/modules/editor/components/atoms'
import { Skeleton } from '@/shared/libs/heroui'

export function GalleryMenuLoading() {
    return (
        <div className="menu-wrapper" data-testid="gallery-menu-loading">
            <MenuTitle>Galeria</MenuTitle>
            <div className="scrollable-wrapper">
                <div className="flex flex-wrap justify-between pr-[2px] gap-[12px]">
                    <Skeleton className="h-[80px] w-[80px] rounded" />
                </div>
            </div>
        </div>
    )
}
