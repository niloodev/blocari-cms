'use client'

import { setupComponent } from '@/shared/tools'
import { Badge } from './Badge'
import { fields, defaultProps } from './Badge.fields'
import { Tag } from 'lucide-react'

export const badge = setupComponent({
    component: Badge,
    config: {
        inline: true,
        label: 'Selo (Badge)',
        fields,
        defaultProps,
    },
    icon: <Tag />,
})
