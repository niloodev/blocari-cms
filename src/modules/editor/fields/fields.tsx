import { Plugin } from '@measured/puck'
import { CustomFields } from './fields.types'

import { FieldText } from './FieldText'
import { FieldNumber } from './FieldNumber'
import { FieldSelect } from './FieldSelect'
import { FieldColor } from './FieldColor'
import { FieldArray } from './FieldArray'
import { FieldImages } from './FieldImages'
import { FieldRadio } from './FieldRadio'
import { FieldDynamicRoute } from './FieldDynamicRoute'
import { FieldAdaptors } from './FieldAdaptors'
import { FieldCollectionImages } from './FieldCollectionImages'
import { FieldObject } from './FieldObject'

export const customFields: CustomFields<
    ['color', 'images', 'dynamic-adaptor', 'adaptor', 'collection-images']
> = {
    'color': ({ value, onChange, field }) => (
        <FieldColor
            value={value}
            onChange={onChange}
            validator={field.validator}
        />
    ),
    'images': ({ value, onChange, field }) => (
        <FieldImages
            value={value}
            onValueChange={onChange}
            label={field.label}
        />
    ),
    'dynamic-adaptor': ({ value, onChange, field }) => (
        <FieldDynamicRoute
            value={value}
            onValueChange={onChange}
            label={field.label}
            validator={field.validator}
        />
    ),
    'adaptor': ({ value, onChange, field }) => (
        <FieldAdaptors
            value={value}
            onValueChange={onChange}
            label={field.label}
            validator={field.validator}
        />
    ),
    'collection-images': ({ value, onChange, field }) => (
        <FieldCollectionImages
            value={value}
            onValueChange={onChange}
            label={field.label}
        />
    ),
}

export const fieldTypes: Plugin['overrides']['fieldTypes'] = {
    text: ({ onChange, value, field }) => (
        <FieldText
            onValueChange={onChange}
            value={value}
            label={field.label}
            validator={field.validator}
        />
    ),
    object: ({ onChange, value, field }) => {
        return <FieldObject value={value} onChange={onChange} field={field} />
    },
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
    radio: ({ onChange, value, field }) => (
        <FieldRadio
            label={field.label}
            validator={field.validator}
            onValueChange={onChange}
            value={value}
            items={field.options as { value: string; label: string }[]}
        />
    ),
    array: ({ ...props }) => {
        return <FieldArray {...props} />
    },
}
