import { IImage } from '@/core/models/images'

export interface ImagesSearchModalProps {
    isOpen: boolean
    onClose: () => void
    onSelect: (image: string | string[]) => void
    mode: 'single' | 'multiple'
    title?: string
    description?: string
}

export interface ImagesSearchModalHookProps {
    onSelect: (image: string | string[]) => void
    isOpen: boolean
    mode: 'single' | 'multiple'
}

export interface FilteredImage extends IImage {
    isVisible: boolean
}
