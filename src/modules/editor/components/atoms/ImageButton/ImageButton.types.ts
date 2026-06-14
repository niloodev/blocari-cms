import { StaticImageData } from 'next/image'

export interface ImageButtonProps {
    name: string
    image: StaticImageData
    selected?: boolean
    onPress?: () => void
}
