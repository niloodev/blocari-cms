import { Button } from '@/shared/libs/heroui'
import { PropertyContainer } from '../../components/atoms'
import { FieldArrayProps, FieldArrayValueItem } from './FieldArray.types'
import { PlusIcon } from 'lucide-react'
import { useFieldArray } from './FieldArray.hook'
import { DndContext } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { FieldArrayItem } from './subcomponents'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'

export function FieldArray({ field, value, onChange }: FieldArrayProps) {
    const {
        handleAdd,
        handleRemove,
        handleFieldChange,
        handleDragEnd,
        itemsId,
        formattedValue,
    } = useFieldArray({
        field,
        value,
        onChange,
    })

    return (
        <DndContext
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
        >
            <PropertyContainer label={field?.label}>
                <SortableContext
                    items={itemsId}
                    strategy={verticalListSortingStrategy}
                >
                    {formattedValue.map(
                        (props: FieldArrayValueItem, index: number) => (
                            <FieldArrayItem
                                key={props.id as string}
                                field={field}
                                index={index}
                                value={value[index]}
                                id={props.id as string}
                                handleRemove={handleRemove}
                                handleFieldChange={handleFieldChange}
                            />
                        ),
                    )}
                </SortableContext>
                <Button onPress={handleAdd} color="primary" variant="faded">
                    <PlusIcon />
                </Button>
            </PropertyContainer>
        </DndContext>
    )
}
