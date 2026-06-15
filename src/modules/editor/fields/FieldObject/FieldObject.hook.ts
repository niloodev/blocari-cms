/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useMemo } from 'react'
import { FieldObjectHookProps } from './FieldObject.types'

export function useFieldObject({
    value,
    onChange,
    field,
}: FieldObjectHookProps) {
    const objectValue = useMemo(() => value || {}, [value])

    const handleFieldChange = useCallback(
        (fieldKey: string, newValue: any) => {
            const updatedValue = {
                ...objectValue,
                [fieldKey]: newValue,
            }
            onChange?.(updatedValue)
        },
        [objectValue, onChange],
    )

    const getFieldKeys = useCallback(() => {
        return field.objectFields ? Object.keys(field.objectFields) : []
    }, [field.objectFields])

    const getFieldConfig = useCallback(
        (fieldKey: string) => {
            return field.objectFields?.[fieldKey]
        },
        [field.objectFields],
    )

    return {
        objectValue,
        handleFieldChange,
        getFieldKeys,
        getFieldConfig,
    }
}
