import { setupComponent } from '@/shared/tools'
import { Flex } from './Flex'
import { fields, defaultProps } from './Flex.fields'
import { LayoutGrid } from 'lucide-react'

export const flex = setupComponent({
    component: Flex,
    config: {
        label: 'Flex',
        fields,
        defaultProps,
    },
    icon: <LayoutGrid />,
})
