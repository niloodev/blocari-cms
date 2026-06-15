import { fieldValidator, setupDefaultFields, setupFields } from '@/shared/tools'
import { PuckComponentProps } from '@/shared/tools/setupFields/setupFields.types'
import { z } from 'zod'

export interface ButtonProps extends PuckComponentProps {
    text: string
    href: string
    variant: 'primary' | 'secondary' | 'ghost'
    size: 'md' | 'lg'
    icon: 'none' | 'github' | 'admin' | 'arrow' | 'external'
    newTab: 'yes' | 'no'
}

export const fields = setupFields<ButtonProps>({
    text: {
        label: 'Texto',
        type: 'text',
        validator: fieldValidator(z.string().min(1, 'O texto é obrigatório')),
    },
    href: {
        label: 'Link (URL)',
        type: 'text',
        validator: fieldValidator(z.string().min(1, 'O link é obrigatório')),
    },
    variant: {
        label: 'Estilo',
        type: 'select',
        options: [
            { label: 'Primário (sólido)', value: 'primary' },
            { label: 'Secundário (contorno)', value: 'secondary' },
            { label: 'Fantasma (transparente)', value: 'ghost' },
        ],
    },
    size: {
        label: 'Tamanho',
        type: 'select',
        options: [
            { label: 'Médio', value: 'md' },
            { label: 'Grande', value: 'lg' },
        ],
    },
    icon: {
        label: 'Ícone',
        type: 'select',
        options: [
            { label: 'Nenhum', value: 'none' },
            { label: 'GitHub', value: 'github' },
            { label: 'Painel (Admin)', value: 'admin' },
            { label: 'Seta', value: 'arrow' },
            { label: 'Link externo', value: 'external' },
        ],
    },
    newTab: {
        label: 'Abrir em nova aba',
        type: 'select',
        options: [
            { label: 'Sim', value: 'yes' },
            { label: 'Não', value: 'no' },
        ],
    },
})

export const defaultProps: ButtonProps = setupDefaultFields<ButtonProps>({
    text: 'Começar agora',
    href: '#',
    variant: 'primary',
    size: 'md',
    icon: 'arrow',
    newTab: 'no',
})
