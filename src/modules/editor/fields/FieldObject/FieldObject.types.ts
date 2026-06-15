/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldProps } from '@/modules/editor/fields/fields.types'

export interface FieldObjectProps {
    value?: Record<string, any>
    onChange?: (value: Record<string, any>) => void
    field: FieldProps & {
        type: string
        objectFields?: Record<string, FieldProps & { type: string }>
    }
    name?: string
}

export interface FieldObjectHookProps {
    value?: Record<string, any>
    onChange?: (value: Record<string, any>) => void
    field: FieldObjectProps['field']
}
