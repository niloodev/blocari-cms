import { FieldProps } from '../fields.types'

export type FieldCollectionImagesValue = string | null

export interface FieldCollectionImagesProps extends FieldProps {
    value?: FieldCollectionImagesValue
    onValueChange?: (value: FieldCollectionImagesValue) => void
    label?: string
}

export interface FieldCollectionImagesHookProps {
    onValueChange?: (value: FieldCollectionImagesValue) => void
}
