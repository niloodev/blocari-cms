import {
    DefaultComponentProps,
    Field,
    BaseField,
    PuckContext,
    DropZoneProps,
} from '@measured/puck'
import { customFields } from '@/modules/editor/fields'

export type PuckComponentProps = {
    puck: Omit<PuckContext, 'renderDropZone'> & {
        renderDropZone: (props: DropZoneProps) => React.ReactNode
    }
}

export type ExtendedField =
    | Field
    | (BaseField & {
          type: keyof typeof customFields
      })

export type SetupFieldsProps<T extends DefaultComponentProps> = {
    [K in keyof T]?: ExtendedField
}
