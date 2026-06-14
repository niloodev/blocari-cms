import { setupComponent } from '@/shared/tools'
import { Typography } from './Typography'
import { fields, defaultProps } from './Typography.fields'
import { Text } from 'lucide-react'

export const typography = setupComponent({
    component: Typography,
    config: {
        label: 'Tipografia',
        fields,
        defaultProps,
    },
    icon: <Text />,
})
