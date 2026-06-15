'use client'

import { fieldTypes } from '@/modules/editor/fields'
import { FieldObjectProps } from './FieldObject.types'
import { useFieldObject } from './FieldObject.hook'

export function FieldObject({ value, onChange, field }: FieldObjectProps) {
    const { objectValue, handleFieldChange, getFieldKeys, getFieldConfig } =
        useFieldObject({
            value,
            onChange,
            field,
        })

    return (
        <div className="flex-col">
            {getFieldKeys().map(fieldKey => {
                const fieldConfig = getFieldConfig(fieldKey)

                if (!fieldConfig) {
                    console.warn(`Field config not found for key: ${fieldKey}`)
                    return null
                }

                const Field =
                    fieldTypes?.[fieldConfig.type as keyof typeof fieldTypes]

                if (!Field) {
                    console.warn(`Field type ${fieldConfig.type} not found`)
                    return null
                }

                return (
                    <Field
                        key={fieldKey}
                        value={objectValue[fieldKey]}
                        onChange={newValue =>
                            handleFieldChange(fieldKey, newValue)
                        }
                        field={fieldConfig}
                        name={fieldKey}
                    >
                        <></>
                    </Field>
                )
            })}
        </div>
    )
}
