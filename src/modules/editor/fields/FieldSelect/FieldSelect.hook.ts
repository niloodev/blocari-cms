import { SharedSelection } from '@heroui/react'
import { FieldSelectProps } from './FieldSelect.types'

export function useFieldSelect({
    validator,
    value,
    onSelectionChange,
}: FieldSelectProps) {
    const error = validator?.(value)

    const handleSelectionChange = (keys: SharedSelection) => {
        if (keys.currentKey) onSelectionChange?.(keys)
    }

    return { error, handleSelectionChange }
}
