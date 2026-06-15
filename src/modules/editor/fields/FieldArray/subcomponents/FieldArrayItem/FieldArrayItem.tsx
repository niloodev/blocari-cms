import { fieldTypes } from '@/modules/editor/fields'
import { FieldArrayItemProps } from './FieldArrayItem.types'
import { ChevronDown, GripVertical, Trash2 } from 'lucide-react'
import { Button, Card } from '@/shared/libs/heroui'
import { useFieldArrayItem } from './FieldArrayItem.hook'

export function FieldArrayItem({
    field,
    index,
    handleFieldChange,
    handleRemove,
    id,
    value,
}: FieldArrayItemProps) {
    const {
        isOpen,
        setIsOpen,
        setNodeRef,
        setActivatorNodeRef,
        listeners,
        attributes,
        style,
        fieldKeys,
    } = useFieldArrayItem({ id, field })

    return (
        <div
            ref={setNodeRef}
            style={style}
            key={index}
            aria-label="Container do item"
            className="[&_[data-property-container]]:px-0 [&_[data-property-container]]:py-2 [&_[data-property-container]]:border-none flex flex-col"
        >
            <Card
                shadow="none"
                radius="md"
                key="base-card"
                className="p-2 h-10 flex flex-row items-center justify-between bg-content2"
            >
                <div
                    ref={setActivatorNodeRef}
                    {...attributes}
                    onMouseDown={e => {
                        e.stopPropagation()
                        e.preventDefault()
                        setIsOpen(false)
                    }}
                    aria-label="Arrastar item"
                    className="h-full w-auto flex justify-center align-center gap-2"
                >
                    <GripVertical {...listeners} />
                    <p className="text-sm mt-[2px] truncate max-w-[110px]">
                        {value[Object.keys(field.arrayFields)[0]]}
                    </p>
                </div>
                <div className="flex flex-row">
                    <Button
                        onPress={() => handleRemove(index)}
                        variant="light"
                        size="sm"
                        color="danger"
                        isIconOnly
                        aria-label="Remover item"
                    >
                        <Trash2 width={16} height={16} />
                    </Button>
                    <Button
                        onPress={() => setIsOpen(open => !open)}
                        variant="light"
                        size="sm"
                        isIconOnly
                        aria-label="Alternar campos do item"
                    >
                        <ChevronDown
                            className={`transition-all duration-300 ${isOpen ? 'rotate-180' : ''}`}
                        />
                    </Button>
                </div>
            </Card>

            <div
                className={`transition-all duration-250 ${isOpen ? 'max-h-[1000px] mt-2' : 'max-h-[0px] overflow-hidden'}`}
                key="fields"
                aria-hidden={!isOpen}
                aria-label="Campos do item"
            >
                {fieldKeys.map(key => {
                    const Field =
                        fieldTypes?.[
                            field?.arrayFields[key]
                                .type as keyof typeof fieldTypes
                        ] ?? (() => <></>)

                    return (
                        <Field
                            key={key}
                            value={value[key]}
                            onChange={newValue =>
                                handleFieldChange({
                                    index,
                                    key,
                                    newValue,
                                    props: value,
                                })
                            }
                            field={field.arrayFields[key]}
                            name={key}
                        >
                            <></>
                        </Field>
                    )
                })}
            </div>
        </div>
    )
}
