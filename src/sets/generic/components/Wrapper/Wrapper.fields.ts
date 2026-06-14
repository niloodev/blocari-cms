import { Fields } from '@measured/puck'

export interface WrapperProps {
    maxWidth: number
}

export const fields: Fields<WrapperProps> = {
    maxWidth: {
        label: 'Largura Máxima',
        type: 'number',
    },
}

export const defaultProps: WrapperProps = {
    maxWidth: 1200,
}
