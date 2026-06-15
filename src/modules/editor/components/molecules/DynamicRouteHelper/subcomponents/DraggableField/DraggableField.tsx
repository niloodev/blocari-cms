'use client'

import { Badge } from '@/shared/libs/heroui'
import { DraggableFieldProps } from './DraggableField.types'
import { useDraggableField } from './DraggableField.hook'

export function DraggableField({ field }: DraggableFieldProps) {
    const { attributes, listeners, setNodeRef, style, getTypeColor } =
        useDraggableField({ field })

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className="p-3 border border-default-200 rounded-lg cursor-move hover:bg-default-50 transition-colors min-h-[80px]"
        >
            <div className="flex flex-col gap-2 h-full">
                <div className="flex items-start justify-between gap-2">
                    <span className="text-sm font-medium text-default-700 truncate flex-1">
                        {field.label}
                    </span>
                    <Badge
                        size="sm"
                        color={getTypeColor(field.type)}
                        className="shrink-0"
                    >
                        {field.type}
                    </Badge>
                </div>

                <div className="text-xs text-default-500">
                    <span className="block truncate">
                        ID:{' '}
                        <code className="bg-default-100 px-1 rounded text-xs">
                            {field.id}
                        </code>
                    </span>
                </div>

                {field.isUnique && (
                    <Badge
                        size="sm"
                        color="success"
                        variant="flat"
                        className="self-start"
                    >
                        Único
                    </Badge>
                )}
            </div>
        </div>
    )
}
