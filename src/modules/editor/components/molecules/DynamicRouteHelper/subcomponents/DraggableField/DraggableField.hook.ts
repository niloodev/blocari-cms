import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { DraggableFieldProps } from './DraggableField.types'

export function useDraggableField({ field }: DraggableFieldProps) {
    const { attributes, listeners, setNodeRef, transform, isDragging } =
        useDraggable({
            id: field.id,
            data: field,
        })

    const style = {
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0 : 1,
    }

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'string':
                return 'primary'
            case 'number':
                return 'secondary'
            case 'boolean':
                return 'success'
            case 'array':
                return 'warning'
            default:
                return 'default'
        }
    }

    return {
        attributes,
        listeners,
        setNodeRef,
        style,
        getTypeColor,
    }
}
