import { setupDefaultFields, setupFields } from '@/shared/tools'
import { PuckComponentProps } from '@/shared/tools/setupFields/setupFields.types'

export interface SectionHeaderProps extends PuckComponentProps {
    eyebrow: string
    title: string
    subtitle: string
    align: 'left' | 'center'
}

export const fields = setupFields<SectionHeaderProps>({
    eyebrow: {
        label: 'Selo (acima do título)',
        type: 'text',
    },
    title: {
        label: 'Título',
        type: 'text',
    },
    subtitle: {
        label: 'Subtítulo',
        type: 'text',
    },
    align: {
        label: 'Alinhamento',
        type: 'select',
        options: [
            { label: 'Centro', value: 'center' },
            { label: 'Esquerda', value: 'left' },
        ],
    },
})

export const defaultProps: SectionHeaderProps =
    setupDefaultFields<SectionHeaderProps>({
        eyebrow: 'Recursos',
        title: 'Tudo que você precisa para publicar',
        subtitle:
            'Um conjunto de blocos pensado para montar páginas rápidas, bonitas e fáceis de manter.',
        align: 'center',
    })
