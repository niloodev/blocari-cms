import { FieldProps } from '@/modules/editor/fields'
import { Dispatch, SetStateAction } from 'react'

export type OnValueChangeType = Dispatch<SetStateAction<File[]>>

export interface FieldFilesHookProps {
    onValueChange?: OnValueChangeType
}

export interface FieldFilesCommonProps {
    allowedExtensions: string
    onValueChange?: OnValueChangeType
    limit?: number
}

export interface FieldFilesProps extends FieldFilesCommonProps, FieldProps {
    files: File[]
}
