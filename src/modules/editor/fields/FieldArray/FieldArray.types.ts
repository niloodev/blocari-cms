import { ArrayField, FieldProps } from '@measured/puck'
import { FieldProps as EditorFieldProps } from '../fields.types'

export type FieldArrayProps = FieldProps<ArrayField> & EditorFieldProps

export type FieldArrayValueItem = {
    [key: string]: string | number | boolean | null
}

export type FieldArrayValue = FieldArrayValueItem[] | undefined

export type FieldArrayHandleFieldChangeProps = {
    index: number
    key: string
    newValue: string | number | boolean
    props: FieldArrayValueItem
}
