import { FieldProps } from '../fields.types'

export interface ImageData {
    src: string
    name: string
}

export type FieldImagesValue = ImageData | string | null

export interface FieldImagesProps extends FieldProps {
    value?: FieldImagesValue
    onValueChange?: (value: FieldImagesValue) => void
    label?: string
}

export interface ImagesSearchModalProps {
    isOpen: boolean
    onClose: () => void
    onSelect: (image: ImageData) => void
}

export interface FieldImagesHookProps {
    onValueChange?: (value: ImageData | null) => void
}
