import { FieldProps } from '@/modules/editor/fields'

export type FieldRadioItem = {
    value: string
    label: string
}

export type FieldRadioProps = FieldProps & {
    items?: FieldRadioItem[]
    value?: string
    onValueChange?: (value: string) => void
}
