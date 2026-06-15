import { setupDefaultFields, setupFields } from '@/shared/tools'
import { PuckComponentProps } from '@/shared/tools/setupFields/setupFields.types'

export interface BadgeProps extends PuckComponentProps {
    text: string
    tone: 'primary' | 'neutral' | 'dark'
    dot: 'yes' | 'no'
}

export const fields = setupFields<BadgeProps>({
    text: {
        label: 'Texto',
        type: 'text',
    },
    tone: {
        label: 'Tom',
        type: 'select',
        options: [
            { label: 'Primário', value: 'primary' },
            { label: 'Neutro', value: 'neutral' },
            { label: 'Escuro', value: 'dark' },
        ],
    },
    dot: {
        label: 'Mostrar ponto pulsante',
        type: 'select',
        options: [
            { label: 'Sim', value: 'yes' },
            { label: 'Não', value: 'no' },
        ],
    },
})

export const defaultProps: BadgeProps = setupDefaultFields<BadgeProps>({
    text: 'Open Source',
    tone: 'primary',
    dot: 'yes',
})
