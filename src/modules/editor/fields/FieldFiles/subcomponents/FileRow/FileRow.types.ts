import {
    FieldFilesCommonProps,
    OnValueChangeType,
} from '../../FieldFiles.types'

export interface FileRowHookProps {
    index: number
    onValueChange?: OnValueChangeType
}

export interface FileRowProps extends FieldFilesCommonProps {
    file: File
    index: number
}
