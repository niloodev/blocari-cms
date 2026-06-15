import { fieldValidator, setupDefaultFields, setupFields } from '@/shared/tools'
import { PuckComponentProps } from '@/shared/tools/setupFields/setupFields.types'
import { z } from 'zod'

export interface HeroProps extends PuckComponentProps {
    eyebrow: string
    title: string
    highlight: string
    subtitle: string
}

export const fields = setupFields<HeroProps>({
    eyebrow: {
        label: 'Selo (acima do título)',
        type: 'text',
    },
    title: {
        label: 'Título',
        type: 'text',
        validator: fieldValidator(z.string().min(1, 'O título é obrigatório')),
    },
    highlight: {
        label: 'Destaque do título (cor primária)',
        type: 'text',
    },
    subtitle: {
        label: 'Subtítulo',
        type: 'text',
    },
})

export const defaultProps: HeroProps = setupDefaultFields<HeroProps>({
    eyebrow: 'Open Source • Block-based CMS',
    title: 'Construa e edite páginas',
    highlight: 'visualmente, em blocos.',
    subtitle:
        'O Blocari é um CMS de código aberto, feito com Next e o editor visual Puck. Monte páginas arrastando blocos — sem escrever uma linha de código.',
})
