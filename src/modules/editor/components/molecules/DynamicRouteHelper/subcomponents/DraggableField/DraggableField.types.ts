export interface DraggableFieldProps {
    field: {
        id: string
        label: string
        isUnique: boolean
        type: 'string' | 'number' | 'boolean' | 'array'
    }
}
