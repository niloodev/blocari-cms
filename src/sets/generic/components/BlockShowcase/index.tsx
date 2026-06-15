'use client'

import { setupComponent } from '@/shared/tools'
import { BlockShowcase } from './BlockShowcase'
import { fields, defaultProps } from './BlockShowcase.fields'
import { Boxes } from 'lucide-react'

export const blockShowcase = setupComponent({
    component: BlockShowcase,
    config: {
        label: 'Animação de Blocos',
        fields,
        defaultProps,
    },
    icon: <Boxes />,
})
