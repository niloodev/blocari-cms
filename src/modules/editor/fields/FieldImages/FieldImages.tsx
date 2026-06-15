'use client'

import { PropertyContainer } from '@/modules/editor/components/atoms'
import { Button, Tooltip } from '@/shared/libs/heroui'
import { ImagePlus, Edit, X, Database } from 'lucide-react'
import { FieldImagesProps } from './FieldImages.types'
import { useFieldImages } from './FieldImages.hook'
import {
    ImagesSearchModal,
    DynamicFieldsModal,
} from '@/modules/editor/components/molecules'

export function FieldImages({
    label = 'Imagem',
    value,
    onValueChange,
}: FieldImagesProps) {
    const {
        isModalOpen,
        isDynamicModalOpen,
        handleOpenModal,
        handleCloseModal,
        handleOpenDynamicModal,
        handleCloseDynamicModal,
        handleSelectImage,
        handleSelectDynamicField,
        handleClearImage,
        hasDynamicAdapter,
        mappedFields,
    } = useFieldImages({ onValueChange })

    const isDynamicField = typeof value === 'string'

    return (
        <>
            <PropertyContainer label={label}>
                <div className="flex flex-col gap-2">
                    {!value ? (
                        <div className="space-y-2">
                            <Button
                                variant="flat"
                                color="primary"
                                onPress={handleOpenModal}
                                startContent={<ImagePlus size={16} />}
                                className="w-full"
                            >
                                Selecionar imagem
                            </Button>
                            {hasDynamicAdapter && mappedFields.length > 0 && (
                                <Button
                                    variant="flat"
                                    color="secondary"
                                    onPress={handleOpenDynamicModal}
                                    startContent={<Database size={16} />}
                                    className="w-full"
                                >
                                    Campo dinâmico
                                </Button>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 p-3 bg-content2 rounded-lg">
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-foreground-800 truncate">
                                        {isDynamicField
                                            ? `Campo: ${value}`
                                            : (value as { name: string }).name}
                                    </p>
                                    <p className="text-xs text-foreground-500 truncate">
                                        {isDynamicField
                                            ? `ID: ${value}`
                                            : (value as { src: string }).src}
                                    </p>
                                </div>
                                <div className="flex gap-1">
                                    <Tooltip
                                        content={
                                            isDynamicField
                                                ? 'Editar campo dinâmico'
                                                : 'Editar imagem'
                                        }
                                    >
                                        <Button
                                            size="sm"
                                            variant="light"
                                            isIconOnly
                                            onPress={
                                                isDynamicField
                                                    ? handleOpenDynamicModal
                                                    : handleOpenModal
                                            }
                                            aria-label={
                                                isDynamicField
                                                    ? 'Editar campo dinâmico'
                                                    : 'Editar imagem'
                                            }
                                        >
                                            <Edit size={14} />
                                        </Button>
                                    </Tooltip>
                                    <Tooltip content="Remover">
                                        <Button
                                            size="sm"
                                            variant="light"
                                            color="danger"
                                            isIconOnly
                                            onPress={handleClearImage}
                                            aria-label="Remover"
                                        >
                                            <X size={14} />
                                        </Button>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </PropertyContainer>

            <ImagesSearchModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSelect={image => {
                    if (typeof image === 'string') {
                        handleSelectImage(image)
                    }
                }}
                mode="single"
            />

            {hasDynamicAdapter && (
                <DynamicFieldsModal
                    isOpen={isDynamicModalOpen}
                    onClose={handleCloseDynamicModal}
                    onSelect={handleSelectDynamicField}
                    fields={mappedFields}
                    fieldType="single"
                />
            )}
        </>
    )
}
