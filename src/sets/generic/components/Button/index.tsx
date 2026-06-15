'use client'

import { setupComponent } from '@/shared/tools'
import { Button } from './Button'
import { fields, defaultProps } from './Button.fields'
import { MousePointerClick } from 'lucide-react'

export const button = setupComponent({
    component: Button,
    config: {
        label: 'Botão',
        fields,
        defaultProps,
    },
    icon: <MousePointerClick />,
})
