import { BaseField } from '@measured/puck'
import { FieldProps as PuckFieldProps } from '@measured/puck'

export interface FieldProps extends Partial<PuckFieldProps> {
    label?: string
    validator?: BaseField['validator']
}

export type CustomFields<T extends string[]> = {
    [K in T[number]]: React.FunctionComponent<
        PuckFieldProps & {
            name: string
            field: FieldProps
        }
    >
}
