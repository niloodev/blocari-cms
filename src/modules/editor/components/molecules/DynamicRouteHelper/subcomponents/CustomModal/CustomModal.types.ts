export interface CustomModalProps {
    isOpen: boolean
    onClose: () => void
    title: string
    children: React.ReactNode
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

export interface CustomModalHeaderProps {
    title: string
    onClose: () => void
}

export interface CustomModalBodyProps {
    children: React.ReactNode
}

export interface CustomModalFooterProps {
    children: React.ReactNode
}

export interface Position {
    x: number
    y: number
}

export interface DragState {
    isDragging: boolean
    startPosition: Position
    currentPosition: Position
}
