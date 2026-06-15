import { useCallback, useEffect, useState, useMemo } from 'react'
import { getImages } from '@/core/controllers/images'
import { IImage } from '@/core/models/images'
import {
    ImagesSearchModalHookProps,
    FilteredImage,
} from './ImagesSearchModal.types'
import { addToast } from '@/shared/libs/heroui'

export function useImagesSearchModal({
    onSelect,
    isOpen,
    mode,
}: ImagesSearchModalHookProps) {
    const [images, setImages] = useState<IImage[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedImages, setSelectedImages] = useState<string[]>([])

    useEffect(() => {
        const fetchImages = async () => {
            setIsLoading(true)
            try {
                const result = await getImages()
                if (result.status === 'success') {
                    setImages(result.payload)
                }
            } catch {
                addToast({
                    title: 'Erro ao carregar imagens',
                    description: 'Tente novamente mais tarde',
                    color: 'danger',
                })
            } finally {
                setIsLoading(false)
            }
        }

        fetchImages()
    }, [isOpen])

    useEffect(() => {
        if (!isOpen) {
            setSearchTerm('')
            setSelectedImages([])
        }
    }, [isOpen])

    const filteredImages = useMemo(() => {
        if (!searchTerm.trim()) {
            return images.map((image: IImage) => ({
                ...image,
                isVisible: true,
            }))
        }

        return images.map((image: IImage) => ({
            ...image,
            isVisible: image.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()),
        }))
    }, [images, searchTerm])

    const handleToggleImage = useCallback(
        (image: FilteredImage) => {
            if (mode === 'single') {
                onSelect(image.src)
                return
            }

            setSelectedImages(prev => {
                const isSelected = prev.includes(image.src)
                if (isSelected) {
                    return prev.filter(src => src !== image.src)
                } else {
                    return [...prev, image.src]
                }
            })
        },
        [mode, onSelect],
    )

    const handleConfirmSelection = useCallback(() => {
        if (mode === 'multiple' && selectedImages.length > 0) {
            onSelect(selectedImages)
        }
    }, [mode, onSelect, selectedImages])

    const isImageSelected = useCallback(
        (image: FilteredImage) => {
            return selectedImages.includes(image.src)
        },
        [selectedImages],
    )

    const handleSearchChange = useCallback((value: string) => {
        setSearchTerm(value)
    }, [])

    return {
        images: filteredImages,
        isLoading,
        searchTerm,
        selectedImages,
        handleToggleImage,
        handleConfirmSelection,
        handleSearchChange,
        isImageSelected,
    }
}
