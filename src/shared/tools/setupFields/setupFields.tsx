import {
    Fields,
    DefaultComponentProps,
    Field,
    CustomField,
} from '@measured/puck'
import { SetupFieldsProps, PuckComponentProps } from './setupFields.types'
import { customFields } from '@/modules/editor/fields'

/**
 * Configura os campos para um componente.
 *
 * @template T - Tipo dos props do componente padrão.
 * @param {SetupFieldsProps<T>} fields - Os campos a serem configurados.
 * @returns {Fields<T>} - Os campos configurados.
 */
export function setupFields<T extends DefaultComponentProps>(
    fields: SetupFieldsProps<T>,
): Fields<T> {
    const fields_: Fields<T> | { [key: string]: Field } = {}

    Object.keys(fields).forEach(key => {
        if (customFields?.[fields[key]!.type as keyof typeof customFields]) {
            fields_[key] = {
                type: 'custom',
                render: customFields[
                    fields[key]!.type as keyof typeof customFields
                ] as unknown as CustomField['render'],
                label: fields[key]?.label,
            }
        } else {
            fields_[key] = fields[key] as Field
        }
    })

    return fields_ as Fields<T>
}

/**
 * Configura os campos padrão para um componente.
 *
 * @template T - Tipo dos props do componente padrão.
 * @param {Omit<T, keyof PuckComponentProps>} fields - Os campos a serem configurados, omitindo os props do componente Puck.
 * @returns {Omit<T, keyof PuckComponentProps> & PuckComponentProps} - Os campos configurados com os props do componente Puck.
 */
export function setupDefaultFields<T extends DefaultComponentProps>(
    fields: Omit<T, keyof PuckComponentProps>,
): Omit<T, keyof PuckComponentProps> & PuckComponentProps {
    return {
        ...fields,
    } as Omit<T, keyof PuckComponentProps> & PuckComponentProps
}
