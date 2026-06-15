'use client'

import { PropertyContainer } from '@/modules/editor/components/atoms'
import { FieldDynamicRouteProps } from './FieldDynamicRoute.types'
import { Button, Select, SelectItem } from '@/shared/libs/heroui'
import { useFieldDynamicRoute } from './FieldDynamicRoute.hook'
import { adapters } from '@/adapters'

export function FieldDynamicRoute({
    label,
    validator,
    value,
    onValueChange,
}: FieldDynamicRouteProps) {
    const {
        error,
        handleValueChange,
        handleAdaptorChange,
        adaptors,
        isDynamicRoute,
    } = useFieldDynamicRoute({
        validator,
        value,
        onValueChange,
    })

    return (
        <PropertyContainer label={label}>
            <div className="space-y-3">
                <div className="flex gap-2">
                    <Button
                        size="sm"
                        variant="solid"
                        color={isDynamicRoute ? 'success' : 'default'}
                        onPress={() => {
                            handleValueChange(Object.keys(adapters)[0] || '')
                        }}
                        className="min-w-[80px] flex-1"
                    >
                        Sim
                    </Button>
                    <Button
                        size="sm"
                        variant="solid"
                        color={!isDynamicRoute ? 'success' : 'default'}
                        onPress={() => handleValueChange('')}
                        className="min-w-[80px] flex-1"
                    >
                        Não
                    </Button>
                </div>

                {isDynamicRoute && (
                    <Select
                        size="sm"
                        label="Adaptador"
                        placeholder="Selecione um adaptador"
                        selectedKeys={value ? [value] : []}
                        onSelectionChange={handleAdaptorChange}
                    >
                        {adaptors.map(adaptor => (
                            <SelectItem key={adaptor.value}>
                                {adaptor.label}
                            </SelectItem>
                        ))}
                    </Select>
                )}
            </div>
            {error?.valid === false && (
                <p className="text-danger-500 text-sm mt-1">{error.message}</p>
            )}
        </PropertyContainer>
    )
}
