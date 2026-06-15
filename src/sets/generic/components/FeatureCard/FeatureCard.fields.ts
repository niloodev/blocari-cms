import { setupDefaultFields, setupFields } from '@/shared/tools'
import { PuckComponentProps } from '@/shared/tools/setupFields/setupFields.types'

export type FeatureIcon =
    | 'blocks'
    | 'cursor'
    | 'image'
    | 'code'
    | 'palette'
    | 'database'
    | 'rocket'
    | 'shield'
    | 'layout'
    | 'zap'

export interface FeatureCardProps extends PuckComponentProps {
    icon: FeatureIcon
    title: string
    text: string
    accent: string
    index: number
}

export const fields = setupFields<FeatureCardProps>({
    icon: {
        label: 'Ícone',
        type: 'select',
        options: [
            { label: 'Blocos', value: 'blocks' },
            { label: 'Clique / Arrastar', value: 'cursor' },
            { label: 'Imagem', value: 'image' },
            { label: 'Código', value: 'code' },
            { label: 'Paleta', value: 'palette' },
            { label: 'Banco de dados', value: 'database' },
            { label: 'Foguete', value: 'rocket' },
            { label: 'Escudo', value: 'shield' },
            { label: 'Layout', value: 'layout' },
            { label: 'Raio', value: 'zap' },
        ],
    },
    title: {
        label: 'Título',
        type: 'text',
    },
    text: {
        label: 'Descrição',
        type: 'text',
    },
    accent: {
        label: 'Cor de destaque',
        type: 'color',
    },
    index: {
        label: 'Ordem (atraso da animação)',
        type: 'number',
    },
})

export const defaultProps: FeatureCardProps =
    setupDefaultFields<FeatureCardProps>({
        icon: 'blocks',
        title: 'Edição em blocos',
        text: 'Monte páginas arrastando e soltando componentes prontos, sem tocar no código.',
        accent: '#e55b5b',
        index: 0,
    })
