'use client'

import { Input } from '@heroui/react'
import { PropertyContainer } from '@/modules/editor/components/atoms'
import { FieldTextProps } from './FieldText.types'

export function FieldText({
    label = 'Texto',
    validator,
    value,
    ...props
}: FieldTextProps) {
    const error = validator?.(value)

    return (
        <PropertyContainer label={label}>
            <Input
                {...props}
                value={value}
                size="md"
                type="text"
                isInvalid={error?.valid === false}
                errorMessage={error?.message}
            />
        </PropertyContainer>
    )
}
