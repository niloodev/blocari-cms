export interface DynamicFieldsModalProps {
    isOpen: boolean
    onClose: () => void
    onSelect: (fieldId: string) => void
    fields: {
        id: string
        label: string
        isUnique: boolean
        type: 'string' | 'number' | 'boolean' | 'array'
    }[]
    title?: string
    description?: string
    fieldType?: 'single' | 'array'
}
