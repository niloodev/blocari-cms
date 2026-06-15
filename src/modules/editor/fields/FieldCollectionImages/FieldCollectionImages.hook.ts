'use client'

import { useCallback, useState } from 'react'
import { FieldCollectionImagesHookProps } from './FieldCollectionImages.types'
import { useAdaptor } from '@/modules/editor/hooks'

export function useFieldCollectionImages({
    onValueChange,
}: FieldCollectionImagesHookProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDynamicModalOpen, setIsDynamicModalOpen] = useState(false)
    const { hasDynamicAdapter, mappedFields } = useAdaptor()

    const handleOpenModal = useCallback(() => {
        setIsModalOpen(true)
    }, [])

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false)
    }, [])

    const handleOpenDynamicModal = useCallback(() => {
        setIsDynamicModalOpen(true)
    }, [])

    const handleCloseDynamicModal = useCallback(() => {
        setIsDynamicModalOpen(false)
    }, [])

    const handleSelectImages = useCallback(
        (images: string[]) => {
            onValueChange?.(images.join(','))
            setIsModalOpen(false)
        },
        [onValueChange],
    )

    const handleSelectDynamicField = useCallback(
        (fieldId: string) => {
            onValueChange?.(fieldId)
            setIsDynamicModalOpen(false)
        },
        [onValueChange],
    )

    const handleClearImages = useCallback(() => {
        onValueChange?.(null)
    }, [onValueChange])

    return {
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
    }
}
