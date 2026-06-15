import { setupDefaultFields, setupFields } from '@/shared/tools'
import { PuckComponentProps } from '@/shared/tools/setupFields/setupFields.types'

export interface BlockShowcaseProps extends PuckComponentProps {
    caption: string
}

export const fields = setupFields<BlockShowcaseProps>({
    caption: {
        label: 'Legenda (opcional)',
        type: 'text',
    },
})

export const defaultProps: BlockShowcaseProps =
    setupDefaultFields<BlockShowcaseProps>({
        caption: 'Tudo é feito de blocos.',
    })
