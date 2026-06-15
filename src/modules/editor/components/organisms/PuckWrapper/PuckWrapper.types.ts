import { ComponentProps } from 'react'
import { Puck } from '@measured/puck'
import { IPage } from '@/core/models/pages'

export type PuckWrapperProps = Omit<ComponentProps<typeof Puck>, 'data'> & {
    page?: IPage
}

export interface PuckWrapperUpdaterProps {
    children: React.ReactNode
    page?: IPage
}
