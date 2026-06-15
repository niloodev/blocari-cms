'use client'

import { setupComponent } from '@/shared/tools'
import { Hero } from './Hero'
import { fields, defaultProps } from './Hero.fields'
import { Sparkles } from 'lucide-react'

export const hero = setupComponent({
    component: Hero,
    config: {
        label: 'Hero (Boas-vindas)',
        fields,
        defaultProps,
    },
    icon: <Sparkles />,
})
