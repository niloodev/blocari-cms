'use client'

import { DragOverlay as DndKitDragOverlay } from '@dnd-kit/core'
import { CustomDragOverlayProps } from './CustomDragOverlay.types'
import { useCustomDragOverlay } from './CustomDragOverlay.hook'

export function CustomDragOverlay({ activeId }: CustomDragOverlayProps) {
    const { activeField } = useCustomDragOverlay({ activeId })

    return (
        <DndKitDragOverlay>
            {activeField ? (
                <div className="px-3 py-2 bg-blue-200 text-blue-800 rounded-md text-sm font-medium shadow-lg max-w-xs truncate z-[9999]">
                    {activeField.label}
                </div>
            ) : null}
        </DndKitDragOverlay>
    )
}
