import { FieldAdaptorsProps } from './FieldAdaptors.types'
import { SharedSelection } from '@/shared/libs/heroui'
import { adapters } from '@/adapters'

export function useFieldAdaptors({
    validator,
    value,
    onValueChange,
}: Pick<FieldAdaptorsProps, 'validator' | 'value' | 'onValueChange'>) {
    const error = validator?.(value)

    const adaptors = Object.entries(adapters).map(([key, adapter]) => ({
        label: adapter.adapterName,
        value: key,
    }))

    const handleAdaptorChange = (keys: SharedSelection) => {
        if (keys.currentKey) {
            onValueChange?.(keys.currentKey)
        } else {
            onValueChange?.(adaptors[0]?.value)
        }
    }

    const currentValue = value || adaptors[0]?.value || ''

    return {
        error,
        handleAdaptorChange,
        adaptors,
        currentValue,
    }
}
