import { viewports } from '@/modules/editor/editor.constants'
import { UiState, Plugin, Config, Fields } from '@measured/puck'
import {
    ComponentItem,
    ComponentsWrapper,
    FieldsWrapper,
} from '@/modules/editor/components/atoms'
import { ViewportStyledInjection } from '@/modules/editor/components/molecules'
import { FieldText, FieldNumber, FieldSelect } from '@/modules/editor/fields'

import { sets } from '@/sets'
import { IPage } from '@/core/models/pages'
import { fieldValidator } from '@/shared/tools'
import { pageSchema } from '@/core/models/pages/pages.schemas'

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
            iframe: ({ children, document }) => (
                <ViewportStyledInjection
                    target={document?.body}
                    iframe={children}
                />
            ),
            components: ComponentsWrapper,
            componentItem: props => <ComponentItem name={props.name} />,
            fields: FieldsWrapper,
            fieldTypes: {
                text: ({ onChange, value, field }) => (
                    <FieldText
                        onValueChange={onChange}
                        value={value}
                        label={field.label}
                        validator={field.validator}
                    />
                ),
                number: ({ onChange, value, field }) => (
                    <FieldNumber
                        onValueChange={onChange}
                        value={value}
                        label={field.label}
                        validator={field.validator}
                    />
                ),
                select: ({ onChange, value, field }) => (
                    <FieldSelect
                        label={field.label}
                        validator={field.validator}
                        onSelectionChange={v => onChange(v.currentKey)}
                        selectedKeys={[value]}
                        items={field.options}
                    />
                ),
            },
        },
    },
]

export const rootFields: Fields<Omit<IPage, 'content'>> = {
    title: {
        label: 'Título',
        type: 'text',
        validator: fieldValidator(pageSchema.shape.title),
    },
    slug: {
        label: 'Slug',
        type: 'text',
        validator: fieldValidator(pageSchema.shape.slug),
    },
}

export const rootDefaultProps: Partial<Omit<IPage, 'content'>> = {
    title: '',
    slug: '',
}

export const config: Config = {
    root: {
        fields: rootFields,
        defaultProps: rootDefaultProps,
    },
    components: sets,
}
