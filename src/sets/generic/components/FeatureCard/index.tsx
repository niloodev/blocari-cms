'use client'

import { setupComponent } from '@/shared/tools'
import { FeatureCard } from './FeatureCard'
import { fields, defaultProps } from './FeatureCard.fields'
import { LayoutPanelTop } from 'lucide-react'

export const featureCard = setupComponent({
    component: FeatureCard,
    config: {
        label: 'Cartão de Funcionalidade',
        fields,
        defaultProps,
    },
    icon: <LayoutPanelTop />,
})
