'use client'

import { Input } from '@/shared/libs/heroui'
import { PropertyContainer } from '@/modules/editor/components/atoms'
import { FieldTextProps } from './FieldText.types'
import { useFieldText } from './FieldText.hook'

export function FieldText({
    label = 'Texto',
    validator,
    value,
    onValueChange,
    ...props
}: FieldTextProps) {
    const { isOver, setNodeRef, dndIsOver, error } = useFieldText({
        value,
        onValueChange,
        validator,
    })

    return (
        <PropertyContainer label={label}>
            <div
                ref={setNodeRef}
                className={`relative ${isOver || dndIsOver ? 'ring-2 ring-blue-500' : ''}`}
            >
                <Input
                    {...props}
                    value={value ?? ''}
                    onValueChange={onValueChange}
                    size="md"
                    type="text"
                    isInvalid={error?.valid === false}
                    errorMessage={error?.message}
                    className={isOver || dndIsOver ? 'border-blue-500' : ''}
                />
            </div>
        </PropertyContainer>
    )
}
