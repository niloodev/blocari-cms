import { FieldDynamicRouteProps } from './FieldDynamicRoute.types'
import { SharedSelection } from '@/shared/libs/heroui'
import { adapters } from '@/adapters'

export function useFieldDynamicRoute({
    validator,
    value,
    onValueChange,
}: Pick<FieldDynamicRouteProps, 'validator' | 'value' | 'onValueChange'>) {
    const isDynamicRoute = value && value !== ''

    const error = validator?.(value)

    const adaptors = Object.entries(adapters).map(([key, adapter]) => ({
        label: adapter.adapterName,
        value: key,
    }))

    const handleValueChange = (newValue: string) => {
        onValueChange?.(newValue)
    }

    const handleAdaptorChange = (keys: SharedSelection) => {
        if (keys.currentKey) {
            onValueChange?.(keys.currentKey)
        }
    }

    return {
        error,
        handleValueChange,
        handleAdaptorChange,
        adaptors,
        isDynamicRoute,
    }
}
