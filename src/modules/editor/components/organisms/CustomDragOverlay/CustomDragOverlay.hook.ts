import { useMemo } from 'react'
import { CustomDragOverlayProps } from './CustomDragOverlay.types'
import { useAdaptor } from '@/modules/editor/hooks'

export function useCustomDragOverlay({ activeId }: CustomDragOverlayProps) {
    const { currentAdapter } = useAdaptor()

    const activeField = useMemo(() => {
        if (!activeId || !currentAdapter) return null
        return currentAdapter.availableMappedFields.find(f => f.id === activeId)
    }, [activeId, currentAdapter])

    return {
        activeField,
    }
}
