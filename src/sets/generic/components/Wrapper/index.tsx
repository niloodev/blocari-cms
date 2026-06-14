import { Wrapper } from './Wrapper'
import { setupComponent } from '@/shared/tools'
import { fields, defaultProps } from './Wrapper.fields'
import { Box } from 'lucide-react'

export const wrapper = setupComponent({
    component: Wrapper,
    config: {
        label: 'Wrapper',
        fields,
        defaultProps,
    },
    icon: <Box />,
})
