export interface ImageButtonProps {
    name: string
    image: {
        src: string
        width: number
        height: number
    }
    selected?: boolean
    onPress?: () => void
}
