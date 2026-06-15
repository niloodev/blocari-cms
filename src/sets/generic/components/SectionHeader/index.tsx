'use client'

import { setupComponent } from '@/shared/tools'
import { SectionHeader } from './SectionHeader'
import { fields, defaultProps } from './SectionHeader.fields'
import { Heading } from 'lucide-react'

export const sectionHeader = setupComponent({
    component: SectionHeader,
    config: {
        label: 'Cabeçalho de Seção',
        fields,
        defaultProps,
    },
    icon: <Heading />,
})
