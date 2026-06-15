import { InputProps } from '@/shared/libs/heroui'
import { FieldProps } from '@/modules/editor/fields'

export type FieldTextProps = Omit<InputProps, 'onChange'> & FieldProps
