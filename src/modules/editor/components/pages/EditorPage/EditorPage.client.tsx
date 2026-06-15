'use client'

import {
    Header,
    headerHeight,
    Preview,
    MenusSidebar,
    PropertiesSidebar,
    PuckWrapper,
    CustomDragOverlay,
} from '@/modules/editor/components/organisms'
import { viewports } from '@/modules/editor/editor.constants'
import { uiConfig, plugins, config } from '@/modules/editor/editor.config'
import { EditorPageClientProps } from './EditorPage.types'
import { DndContext } from '@dnd-kit/core'
import { useState } from 'react'

export function EditorPageClient({ initialPage }: EditorPageClientProps) {
    const [activeId, setActiveId] = useState<string | null>(null)

    return (
        <DndContext
            onDragStart={({ active }) => {
                console.log(
                    '🚀 Global Drag Start:',
                    active.id,
                    active.data.current,
                )
                setActiveId(active.id as string)
            }}
            onDragOver={({ active, over }) => {
                console.log('🔄 Global Drag Over:', active.id, '->', over?.id)
            }}
            onDragEnd={event => {
                console.log(
                    '🏁 Global Drag End:',
                    event.active.id,
                    '->',
                    event.over?.id,
                )
                setActiveId(null)
            }}
        >
            <PuckWrapper
                config={config}
                page={initialPage}
                plugins={plugins}
                ui={uiConfig}
                viewports={viewports}
            >
                <Header />
                <div
                    className="flex justify-between flex-1 align-stretch relative"
                    style={{
                        maxHeight: `calc(100vh - ${headerHeight}px)`,
                    }}
                >
                    <MenusSidebar />
                    <Preview />
                    <PropertiesSidebar />
                </div>

                <CustomDragOverlay activeId={activeId} />
            </PuckWrapper>
        </DndContext>
    )
}
