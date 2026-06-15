'use client'

import { usePropertiesSidebar } from './PropertiesSidebar.hook'

export function PropertiesSidebar() {
    const { Properties } = usePropertiesSidebar()

    return (
        <aside className="min-w-[280px] w-[280px] max-h-full overflow-hidden flex bg-content1 border-[1.5px] border-solid border-content1">
            <Properties />
        </aside>
    )
}
