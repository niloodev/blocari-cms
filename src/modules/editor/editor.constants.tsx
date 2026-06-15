import {
    Monitor,
    Tablet,
    Smartphone,
    LayoutGrid,
    PenTool,
    // TypeOutline,
    ImagePlus,
    Logs,
} from 'lucide-react'
import { Viewports } from '@measured/puck'
import { Menus } from './editor.types'

export const viewports: Viewports = [
    {
        width: 1600,
        height: 'auto',
        icon: <Monitor width={20} height={20} />,
        label: 'Desktop',
    },
    {
        width: 768,
        height: 'auto',
        icon: <Tablet width={20} height={20} />,
        label: 'Tablet',
    },
    {
        width: 380,
        height: 'auto',
        icon: <Smartphone width={20} height={20} />,
        label: 'Mobile',
    },
]

export const menus: Menus = [
    [
        {
            icon: <LayoutGrid width={20} height={20} />,
            title: 'Páginas',
            menu: 'PagesMenu',
            properties: 'PagesProperties',
        },
    ],
    [
        {
            icon: <Logs width={20} height={20} />,
            title: 'Visão Geral',
            menu: 'OutlineMenu',
        },
        {
            icon: <PenTool width={20} height={20} />,
            title: 'Componentes',
            menu: 'ComponentsMenu',
            properties: 'ComponentsProperties',
        },
        // {
        //     icon: <TypeOutline width={20} height={20} />,
        //     title: 'Tipografia',
        //     menu: 'TypographyMenu',
        //     properties: 'TypographyProperties',
        // },
        {
            icon: <ImagePlus width={20} height={20} />,
            title: 'Galeria',
            menu: 'GalleryMenu',
            properties: 'GalleryProperties',
        },
    ],
]

export const defaultMenu = menus[0][0]
