import { Fields } from '@measured/puck'

export interface FlexProps {
    direction: 'row' | 'column'
    justify:
        | 'flex-start'
        | 'flex-end'
        | 'center'
        | 'space-between'
        | 'space-around'
        | 'space-evenly'
    align: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'
    wrap: 'nowrap' | 'wrap' | 'wrap-reverse'
    gap: number
}

export const fields: Fields<FlexProps> = {
    direction: {
        label: 'Direção',
        type: 'select',
        options: [
            { value: 'row', label: 'Linha' },
            { value: 'column', label: 'Coluna' },
        ],
    },
    justify: {
        label: 'Distribuição Principal',
        type: 'select',
        options: [
            { value: 'flex-start', label: 'Começo' },
            { value: 'flex-end', label: 'Final' },
            { value: 'center', label: 'Centro' },
            { value: 'space-between', label: 'Espaço entre' },
            { value: 'space-around', label: 'Espaço ao redor' },
            { value: 'space-evenly', label: 'Espaço uniforme' },
        ],
    },
    align: {
        label: 'Distribuição Secundária',
        type: 'select',
        options: [
            { value: 'flex-start', label: 'Começo' },
            { value: 'flex-end', label: 'Final' },
            { value: 'center', label: 'Centro' },
            { value: 'stretch', label: 'Esticar' },
            { value: 'baseline', label: 'Baseline' },
        ],
    },
    wrap: {
        label: 'Quebra de linha',
        type: 'select',
        options: [
            { value: 'nowrap', label: 'Não quebrar' },
            { value: 'wrap', label: 'Quebrar' },
            { value: 'wrap-reverse', label: 'Quebrar ao contrário' },
        ],
    },
    gap: {
        label: 'Espaçamento',
        type: 'number',
    },
}

export const defaultProps: FlexProps = {
    direction: 'row',
    justify: 'flex-start',
    align: 'flex-start',
    wrap: 'nowrap',
    gap: 0,
}
