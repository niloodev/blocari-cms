import { viewports } from '@/modules/editor/editor.constants'
import { UiState, Plugin, Config } from '@measured/puck'
import {
    ComponentItem,
    ComponentsWrapper,
    FieldsWrapper,
} from '@/modules/editor/components/atoms'
import { ViewportStyledInjection } from '@/modules/editor/components/molecules'
import { fieldTypes } from '@/modules/editor/fields'

import { sets } from '@/sets'
import { IPage } from '@/core/models/pages'
import { fieldValidator, setupFields } from '@/shared/tools'
import {
    titleSchema,
    slugSchema,
    dynamicAdaptorSchema,
    descriptionSchema,
    canonicalSchema,
    opengraphImageSchema,
} from '@/core/models/pages/pages.schemas'

export const uiConfig: Partial<UiState> = {
    viewports: {
        current: {
            width: viewports[0].width,
            height: viewports[0].height ?? 'auto',
        },
        controlsVisible: true,
        options: [],
    },
}

export const plugins: Plugin[] = [
    {
        overrides: {
            iframe: ViewportStyledInjection,
            components: ComponentsWrapper,
            componentItem: ComponentItem,
            fields: FieldsWrapper,
            fieldTypes,
        },
    },
]

export const rootFields = setupFields<Omit<IPage, 'content'>>({
    title: {
        label: 'Título',
        type: 'text',
        validator: fieldValidator(titleSchema),
    },
    slug: {
        label: 'Slug',
        type: 'text',
        validator: fieldValidator(slugSchema),
    },
    dynamicAdaptor: {
        label: 'Dinamismo da Rota',
        type: 'dynamic-adaptor',
        validator: fieldValidator(dynamicAdaptorSchema),
    },
    description: {
        label: 'Descrição',
        type: 'text',
        validator: fieldValidator(descriptionSchema),
    },
    canonical: {
        label: 'Canonical',
        type: 'text',
        validator: fieldValidator(canonicalSchema),
    },
    opengraphImage: {
        label: 'Imagem OG',
        type: 'images',
        validator: fieldValidator(opengraphImageSchema),
    },
})

export const rootDefaultProps: Partial<Omit<IPage, 'content'>> = {
    title: '',
    slug: '',
    dynamicAdaptor: '',
    description: '',
    canonical: '',
    opengraphImage: '',
}

export const config: Config = {
    root: {
        fields: rootFields,
        defaultProps: rootDefaultProps,
    },
    components: sets,
}
