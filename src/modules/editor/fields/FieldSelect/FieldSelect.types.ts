import { SelectProps } from '@heroui/react'
import { FieldProps } from '@/modules/editor/fields'

export type FieldSelectItens = {
    value: string
    label: string
}

export type FieldSelectProps = Omit<SelectProps & FieldProps, 'children'>
