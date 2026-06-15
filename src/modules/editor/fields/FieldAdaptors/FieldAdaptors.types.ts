import { FieldProps } from '@/modules/editor/fields'

export type FieldAdaptorsProps = FieldProps & {
    value?: string
    onValueChange?: (value: string) => void
}
