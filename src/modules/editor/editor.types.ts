import { ReactNode } from 'react'
import * as menusModules from './menus'
import * as propertiesModules from './properties'

export interface Menu {
    icon: ReactNode
    title: string
    menu?: keyof typeof menusModules
    properties?: keyof typeof propertiesModules
    disabled?: boolean
}

export type Menus = Array<Array<Menu>>
