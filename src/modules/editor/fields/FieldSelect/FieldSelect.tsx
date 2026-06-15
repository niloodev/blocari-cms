'use client'

import { PropertyContainer } from '@/modules/editor/components/atoms'
import { FieldSelectProps, FieldSelectItens } from './FieldSelect.types'
import { Select, SelectItem } from '@/shared/libs/heroui'
import { useFieldSelect } from './FieldSelect.hook'

export function FieldSelect({
    label,
    items,
    validator,
    value,
    onSelectionChange,
    ...props
}: FieldSelectProps) {
    const { error, handleSelectionChange } = useFieldSelect({
        validator,
        value,
        onSelectionChange,
    })

    return (
        <PropertyContainer label={label}>
            <Select
                {...props}
                size="md"
                aria-label={label}
                items={items as FieldSelectItens[]}
                isInvalid={error?.valid === false}
                errorMessage={error?.message}
                onSelectionChange={handleSelectionChange}
                value={value}
            >
                {item => <SelectItem key={item.value}>{item.label}</SelectItem>}
            </Select>
        </PropertyContainer>
    )
}
