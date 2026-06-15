/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDroppable, useDndMonitor } from '@dnd-kit/core'
import { FieldTextProps } from './FieldText.types'

function isAcceptedDropItem(item: any): boolean {
    if (!item || !item.id) return false

    const acceptedTypes = ['string', 'number', 'boolean']
    return acceptedTypes.includes(item.type)
}

export function useFieldText({
    value,
    onValueChange,
    validator,
}: FieldTextProps) {
    const error = validator?.(value)

    const { setNodeRef, isOver: dndIsOver } = useDroppable({
        id: `field-text-drop-zone-${value ?? 'empty'}`,
    })

    useDndMonitor({
        onDragEnd: event => {
            const { active, over } = event

            if (over?.id === `field-text-drop-zone-${value ?? 'empty'}`) {
                const item = active.data.current
                if (item && isAcceptedDropItem(item)) {
                    const placeholder = `<${item.id}>`
                    const newValue = (value ?? '') + placeholder
                    onValueChange?.(newValue)
                }
            }
        },
    })

    return {
        isOver: false,
        setNodeRef,
        dndIsOver,
        error,
    }
}
