import { useCallback, useMemo } from 'react'
import {
    FieldArrayProps,
    FieldArrayHandleFieldChangeProps,
    FieldArrayValueItem,
} from './FieldArray.types'
import { arrayMove } from '@dnd-kit/sortable'
import { DragEndEvent } from '@dnd-kit/core'
import { v4 as uuidv4 } from 'uuid'

export const useFieldArray = ({ value, onChange }: FieldArrayProps) => {
    const formattedValue = useMemo(
        () =>
            (value ?? []).map((item: FieldArrayValueItem) => ({
                ...item,
                id: item.id ?? uuidv4(),
            })),
        [value],
    )

    const itemsId = useMemo(
        () => formattedValue.map((item: FieldArrayValueItem) => item.id),
        [formattedValue],
    )

    const handleAdd = useCallback(() => {
        const newItem = {
            id: uuidv4(),
        }
        const prev_ = [...(value ?? [])]
        prev_.push(newItem)
        onChange(prev_)
    }, [value, onChange])

    const handleRemove = useCallback(
        (index: number) => {
            const prev_ = [...(value ?? [])]
            prev_.splice(index, 1)
            onChange(prev_)
        },
        [value, onChange],
    )

    const handleFieldChange = useCallback(
        ({ index, key, newValue, props }: FieldArrayHandleFieldChangeProps) => {
            const oldValue_ = [...(value ?? [])]
            const props_ = {
                ...props,
            }
            props_[key] = newValue
            oldValue_[index] = props_
            onChange(oldValue_)
        },
        [value, onChange],
    )

    const handleDragEnd = useCallback(
        (event: DragEndEvent) => {
            const { active, over } = event
            if (active.id !== over?.id) {
                const oldIndex = formattedValue.findIndex(
                    (item: FieldArrayValueItem) => item.id === active.id,
                )
                const newIndex = formattedValue.findIndex(
                    (item: FieldArrayValueItem) => item.id === over?.id,
                )
                const newItemsArray = arrayMove<FieldArrayValueItem>(
                    formattedValue,
                    oldIndex,
                    newIndex,
                )
                onChange(newItemsArray)
            }
        },
        [formattedValue, onChange],
    )

    return {
        handleAdd,
        handleRemove,
        handleFieldChange,
        itemsId,
        formattedValue,
        handleDragEnd,
    }
}
