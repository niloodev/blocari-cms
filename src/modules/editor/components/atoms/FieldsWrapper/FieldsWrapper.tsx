import { FieldsWrapperProps } from './FieldsWrapper.types'

export function FieldsWrapper({ children }: FieldsWrapperProps) {
    return (
        <div className="flex flex-col [&>div]:!p-0 [&>div]:!m-0 [&>div]:!border-0">
            {children}
        </div>
    )
}
