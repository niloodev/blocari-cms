'use client'

import { NumberInput } from '@heroui/react'
import { PropertyContainer } from '@/modules/editor/components/atoms'
import { FieldNumberProps } from './FieldNumber.types'

export function FieldNumber({
    label = 'Número',
    validator,
    value,
    ...props
}: FieldNumberProps) {
    const error = validator?.(value)

    return (
        <PropertyContainer label={label}>
            <NumberInput
                {...props}
                size="sm"
                aria-label={label}
                isInvalid={error?.valid === false}
                value={value}
                errorMessage={error?.message}
                formatOptions={{
                    useGrouping: false,
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                }}
            />
        </PropertyContainer>
    )
}
