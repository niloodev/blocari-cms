'use client'

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    Spinner,
} from '@/shared/libs/heroui'
import { Search, Check } from 'lucide-react'
import { ImagesSearchModalProps } from './ImagesSearchModal.types'
import { useImagesSearchModal } from './ImagesSearchModal.hook'
import { FilteredImage } from './ImagesSearchModal.types'
import { ImageButton } from '@/modules/editor/components/atoms'

export function ImagesSearchModal({
    isOpen,
    onClose,
    onSelect,
    mode,
    title,
    description,
}: ImagesSearchModalProps) {
    const {
        images,
        isLoading,
        searchTerm,
        selectedImages,
        handleToggleImage,
        handleConfirmSelection,
        handleSearchChange,
        isImageSelected,
    } = useImagesSearchModal({
        onSelect,
        isOpen,
        mode,
    })

    const visibleImages = images.filter(
        (image: FilteredImage) => image.isVisible,
    )

    const defaultTitle =
        mode === 'single' ? 'Selecionar Imagem' : 'Selecionar Imagens'
    const defaultDescription =
        mode === 'single'
            ? 'Procure e selecione uma imagem da galeria'
            : 'Procure e selecione múltiplas imagens da galeria'

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size={mode === 'single' ? '2xl' : '3xl'}
        >
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">
                    <h3 className="text-lg font-semibold">
                        {title || defaultTitle}
                    </h3>
                    <p className="text-sm text-foreground-500">
                        {description || defaultDescription}
                    </p>
                    {mode === 'multiple' && selectedImages.length > 0 && (
                        <p className="text-sm text-foreground-500">
                            {selectedImages.length} image
                            {selectedImages.length !== 1 ? 'ns' : 'm'}{' '}
                            selecionada{selectedImages.length !== 1 ? 's' : ''}
                        </p>
                    )}
                </ModalHeader>
                <ModalBody>
                    <div className="space-y-5">
                        <div className="relative">
                            <Search
                                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-foreground-400"
                                size={16}
                            />
                            <Input
                                placeholder="Procurar imagens..."
                                value={searchTerm}
                                onValueChange={handleSearchChange}
                                className="pl-10"
                            />
                        </div>

                        {isLoading ? (
                            <div className="flex justify-center items-center h-40">
                                <Spinner size="sm" />
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 max-h-96 overflow-y-auto">
                                {visibleImages.map(image => (
                                    <div
                                        key={image._id}
                                        className="relative aspect-square w-min h-min"
                                    >
                                        <ImageButton
                                            image={{
                                                src: image.src,
                                                width: 100,
                                                height: 100,
                                            }}
                                            name={image.name}
                                            onPress={() =>
                                                handleToggleImage(image)
                                            }
                                        />
                                        {mode === 'multiple' &&
                                            isImageSelected(image) && (
                                                <div className="absolute top-2 right-2 bg-primary-500 text-white rounded-full p-1">
                                                    <Check size={12} />
                                                </div>
                                            )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {!isLoading && visibleImages.length === 0 && (
                            <div className="text-center py-8 text-foreground-500">
                                {searchTerm
                                    ? 'Nenhuma imagem encontrada'
                                    : 'Nenhuma imagem disponível, vá até a galeria de imagens para adicionar'}
                            </div>
                        )}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button variant="flat" color="danger" onPress={onClose}>
                        Cancelar
                    </Button>
                    {mode === 'multiple' && (
                        <Button
                            color="primary"
                            variant="flat"
                            onPress={handleConfirmSelection}
                            isDisabled={selectedImages.length === 0}
                        >
                            Confirmar ({selectedImages.length})
                        </Button>
                    )}
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
