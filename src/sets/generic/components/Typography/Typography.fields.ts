import { Fields } from '@measured/puck'

export interface TypographyProps {
    text: string
    size: '16px' | '20px' | '24px' | '32px' | '40px'
    weight: 'normal' | 'bold'
    tag: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    align: 'left' | 'center' | 'right'
    padding: '0px' | '16px' | '24px' | '32px'
}

export const fields: Fields<TypographyProps> = {
    text: {
        label: 'Texto',
        type: 'text',
    },
    size: {
        label: 'Tamanho',
        type: 'select',
        options: [
            { value: '16px', label: '16px' },
            { value: '20px', label: '20px' },
            { value: '24px', label: '24px' },
            { value: '32px', label: '32px' },
            { value: '40px', label: '40px' },
        ],
    },
    weight: {
        label: 'Peso',
        type: 'select',
        options: [
            { value: 'normal', label: 'Normal' },
            { value: 'bold', label: 'Negrito' },
        ],
    },
    tag: {
        label: 'Tagueamento',
        type: 'select',
        options: [
            { value: 'p', label: 'P' },
            { value: 'h1', label: 'H1' },
            { value: 'h2', label: 'H2' },
            { value: 'h3', label: 'H3' },
            { value: 'h4', label: 'H4' },
            { value: 'h5', label: 'H5' },
            { value: 'h6', label: 'H6' },
        ],
    },
    align: {
        label: 'Alinhamento',
        type: 'select',
        options: [
            { value: 'left', label: 'Esquerda' },
            { value: 'center', label: 'Centro' },
            { value: 'right', label: 'Direita' },
        ],
    },
    padding: {
        label: 'Espaçamento Interno',
        type: 'select',
        options: [
            { value: '0px', label: '0px' },
            { value: '16px', label: '16px' },
            { value: '24px', label: '24px' },
            { value: '32px', label: '32px' },
        ],
    },
}

export const defaultProps: TypographyProps = {
    text: 'Texto',
    size: '16px',
    weight: 'normal',
    tag: 'p',
    align: 'left',
    padding: '32px',
}
