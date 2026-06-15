'use client'

import { useCallback, useState } from 'react'
import { FieldImagesValue } from './FieldImages.types'
import { useAdaptor } from '@/modules/editor/hooks'

export function useFieldImages({
    onValueChange,
}: {
    onValueChange?: (value: FieldImagesValue) => void
}) {
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

    const handleSelectImage = useCallback(
        (image: string) => {
            onValueChange?.(image)
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

    const handleClearImage = useCallback(() => {
        onValueChange?.(null)
    }, [onValueChange])

    return {
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
    }
}
