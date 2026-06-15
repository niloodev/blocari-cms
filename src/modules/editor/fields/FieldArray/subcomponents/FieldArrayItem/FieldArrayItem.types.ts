import { ArrayField } from '@measured/puck'
import {
    FieldArrayHandleFieldChangeProps,
    FieldArrayValueItem,
} from '../../FieldArray.types'

export interface FieldArrayItemProps {
    field: ArrayField
    index: number
    id: string | number
    value: FieldArrayValueItem
    handleFieldChange: (props: FieldArrayHandleFieldChangeProps) => void
    handleRemove: (index: number) => void
}
