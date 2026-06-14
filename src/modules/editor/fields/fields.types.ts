import { BaseField } from '@measured/puck'

export interface FieldProps {
    label?: string
    validator?: BaseField['validator']
}
