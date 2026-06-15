'use client'

import { PropertyContainer } from '@/modules/editor/components/atoms'
import { FieldAdaptorsProps } from './FieldAdaptors.types'
import { Select, SelectItem } from '@/shared/libs/heroui'
import { useFieldAdaptors } from './FieldAdaptors.hook'

export function FieldAdaptors({
    label,
    validator,
    value,
    onValueChange,
}: FieldAdaptorsProps) {
    const { error, handleAdaptorChange, adaptors, currentValue } =
        useFieldAdaptors({
            validator,
            value,
            onValueChange,
        })

    return (
        <PropertyContainer label={label}>
            <Select
                size="sm"
                label="Adaptador"
                placeholder="Selecione um adaptador"
                selectedKeys={currentValue ? [currentValue] : []}
                onSelectionChange={handleAdaptorChange}
            >
                {adaptors.map(adaptor => (
                    <SelectItem key={adaptor.value}>{adaptor.label}</SelectItem>
                ))}
            </Select>
            {error?.valid === false && (
                <p className="text-danger-500 text-sm mt-1">{error.message}</p>
            )}
        </PropertyContainer>
    )
}
