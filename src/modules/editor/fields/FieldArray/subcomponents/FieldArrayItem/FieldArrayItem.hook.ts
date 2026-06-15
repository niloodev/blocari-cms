import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useState } from 'react'
import { FieldArrayItemProps } from './FieldArrayItem.types'

export const useFieldArrayItem = ({
    id,
    field,
}: {
    id: FieldArrayItemProps['id']
    field: FieldArrayItemProps['field']
}) => {
    const [isOpen, setIsOpen] = useState(false)

    const {
        listeners,
        attributes,
        setNodeRef,
        setActivatorNodeRef,
        transform,
    } = useSortable({ id })

    const style = {
        transform: CSS.Translate.toString(transform),
    }

    const fieldKeys = Object.keys(field.arrayFields).map(key => key)

    return {
        isOpen,
        setIsOpen,
        listeners,
        attributes,
        setNodeRef,
        setActivatorNodeRef,
        style,
        fieldKeys,
    }
}
