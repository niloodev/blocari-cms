import { FieldProps } from '@/modules/editor/fields'

export type FieldDynamicRouteProps = FieldProps & {
    value?: string
    onValueChange?: (value: string) => void
}
