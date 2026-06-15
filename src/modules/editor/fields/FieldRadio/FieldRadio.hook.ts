import { FieldRadioProps } from './FieldRadio.types'

export function useFieldRadio({
    validator,
    value,
    onValueChange,
}: Pick<FieldRadioProps, 'validator' | 'value' | 'onValueChange'>) {
    const error = validator?.(value)

    const handleValueChange = (newValue: string) => {
        onValueChange?.(newValue)
    }

    return { error, handleValueChange }
}
