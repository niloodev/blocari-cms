'use client'

import { PropertyContainer } from '@/modules/editor/components/atoms'
import { Button, Tooltip } from '@/shared/libs/heroui'
import { ImagePlus, Edit, X, Database } from 'lucide-react'
import { FieldCollectionImagesProps } from './FieldCollectionImages.types'
import { useFieldCollectionImages } from './FieldCollectionImages.hook'
import {
    DynamicFieldsModal,
    ImagesSearchModal,
} from '@/modules/editor/components/molecules'
import Image from 'next/image'

export function FieldCollectionImages({
    label = 'Coleção de Imagens',
    value,
    onValueChange,
}: FieldCollectionImagesProps) {
    const {
        isModalOpen,
        isDynamicModalOpen,
        handleOpenModal,
        handleCloseModal,
        handleOpenDynamicModal,
        handleCloseDynamicModal,
        handleSelectImages,
        handleSelectDynamicField,
        handleClearImages,
        hasDynamicAdapter,
        mappedFields,
    } = useFieldCollectionImages({ onValueChange })

    const isDynamicField = value && value.startsWith('<') && value.endsWith('>')
    const isImageArray =
        value &&
        value.split(',').length > 0 &&
        value.split(',').some(url => url.trim().startsWith('http'))

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
                                Selecionar imagens
                            </Button>
                            {hasDynamicAdapter && mappedFields.length > 0 && (
                                <Button
                                    variant="flat"
                                    color="secondary"
                                    onPress={handleOpenDynamicModal}
                                    startContent={<Database size={16} />}
                                    className="w-full"
                                >
                                    Campo dinâmico (array)
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
                                            : isImageArray
                                              ? `${(value as string).split(',').length} image${(value as string).split(',').length !== 1 ? 'ns' : 'm'} selecionada${(value as string).split(',').length !== 1 ? 's' : ''}`
                                              : 'Campo dinâmico'}
                                    </p>
                                    <p className="text-xs text-foreground-500 truncate">
                                        {isDynamicField
                                            ? `ID: ${value}`
                                            : isImageArray
                                              ? `${(value as string).split(',').join(', ')}`
                                              : ''}
                                    </p>
                                </div>
                                <div className="flex gap-1">
                                    <Tooltip
                                        content={
                                            isDynamicField
                                                ? 'Editar campo dinâmico'
                                                : 'Editar imagens'
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
                                                    : 'Editar imagens'
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
                                            onPress={handleClearImages}
                                            aria-label="Remover"
                                        >
                                            <X size={14} />
                                        </Button>
                                    </Tooltip>
                                </div>
                            </div>

                            {isImageArray && (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                                    {(value as string)
                                        .split(',')
                                        .slice(0, 8)
                                        .map((image, index) => (
                                            <div
                                                key={index}
                                                className="relative aspect-square bg-default-100 rounded-lg overflow-hidden"
                                            >
                                                <Image
                                                    src={image}
                                                    alt="Preview Image"
                                                    className="w-full h-full object-cover"
                                                    width={100}
                                                    height={100}
                                                />
                                                {(value as string).split(',')
                                                    .length > 8 &&
                                                    index === 7 && (
                                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                                            <span className="text-white text-xs font-medium">
                                                                +
                                                                {(
                                                                    value as string
                                                                ).length - 8}
                                                            </span>
                                                        </div>
                                                    )}
                                            </div>
                                        ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </PropertyContainer>

            {hasDynamicAdapter && (
                <DynamicFieldsModal
                    isOpen={isDynamicModalOpen}
                    onClose={handleCloseDynamicModal}
                    onSelect={handleSelectDynamicField}
                    fields={mappedFields}
                    fieldType="array"
                />
            )}

            <ImagesSearchModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSelect={images => {
                    if (Array.isArray(images)) {
                        handleSelectImages(images)
                    }
                }}
                mode="multiple"
            />
        </>
    )
}
