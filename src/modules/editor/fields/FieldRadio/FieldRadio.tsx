'use client'

import { PropertyContainer } from '@/modules/editor/components/atoms'
import { FieldRadioProps, FieldRadioItem } from './FieldRadio.types'
import { Button } from '@/shared/libs/heroui'
import { useFieldRadio } from './FieldRadio.hook'

export function FieldRadio({
    label,
    items,
    validator,
    value,
    onValueChange,
}: FieldRadioProps) {
    const { error, handleValueChange } = useFieldRadio({
        validator,
        value,
        onValueChange,
    })

    return (
        <PropertyContainer label={label}>
            <div className="flex gap-2">
                {items?.map((item: FieldRadioItem) => (
                    <Button
                        key={item.value}
                        size="sm"
                        variant="solid"
                        color={value === item.value ? 'success' : 'default'}
                        onPress={() => handleValueChange(item.value)}
                        className="min-w-[80px] flex-1"
                    >
                        {item.label}
                    </Button>
                ))}
            </div>
            {error?.valid === false && (
                <p className="text-danger-500 text-sm mt-1">{error.message}</p>
            )}
        </PropertyContainer>
    )
}
