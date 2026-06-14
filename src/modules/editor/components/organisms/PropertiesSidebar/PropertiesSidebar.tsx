'use client'

import { usePropertiesSidebar } from './PropertiesSidebar.hook'

export function PropertiesSidebar() {
    const { Properties } = usePropertiesSidebar()

    return (
        <aside className="min-w-[280px] w-[280px] max-h-full overflow-hidden flex bg-white border-[1.5px] border-solid border-[#f4f4f5]">
            <Properties />
        </aside>
    )
}
