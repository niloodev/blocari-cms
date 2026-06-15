import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEditor } from '@/modules/editor/store'
import { Dispatch, SetStateAction } from 'react'
import { createImage, updateImage } from '@/core/controllers/images'
import { galleryFormSchema, GalleryFormData } from './GalleryProperties.schema'
import { useRouter } from 'next/navigation'
import { addToast } from '@/shared/libs/heroui'
import { isValidImageUrl, extractFileNameFromUrl } from '@/core/tools'
import {
    galleryPropertiesConstants,
    MAX_IMAGE_SIZE_BYTES,
    MAX_IMAGE_SIZE_MB,
} from './GalleryProperties.constants'

export function useGalleryProperties() {
    const router = useRouter()
    const { sharedMenuData, setSharedMenuData } = useEditor()
    const selectedImageId = sharedMenuData.selectedImageId
    const isCreateMode = !selectedImageId

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [currentFiles, setCurrentFiles] = useState<File[]>([])

    const form = useForm<GalleryFormData>({
        resolver: zodResolver(galleryFormSchema),
        defaultValues: {
            name: sharedMenuData.selectedImagePayload?.name || '',
            src: sharedMenuData.selectedImagePayload?.src || '',
            alt: sharedMenuData.selectedImagePayload?.alt || '',
            title:
                sharedMenuData.selectedImagePayload?.title ||
                sharedMenuData.selectedImagePayload?.alt,
        },
    })

    useEffect(() => {
        if (isCreateMode) {
            form.reset({
                name: '',
                src: '',
                alt: '',
                title: '',
            })
            setCurrentFiles([])
        } else {
            form.reset({
                name: sharedMenuData.selectedImagePayload?.name,
                src: sharedMenuData.selectedImagePayload?.src,
                alt: sharedMenuData.selectedImagePayload?.alt,
                title: sharedMenuData.selectedImagePayload?.title,
            })
            if (
                sharedMenuData.selectedImagePayload?.src &&
                isValidImageUrl(sharedMenuData.selectedImagePayload.src)
            ) {
                setCurrentFiles([
                    new File(
                        [''],
                        extractFileNameFromUrl(
                            sharedMenuData.selectedImagePayload.src,
                        ),
                        {
                            type: 'image/png',
                        },
                    ),
                ])
            } else {
                setCurrentFiles([])
            }
        }
    }, [isCreateMode, form, sharedMenuData.selectedImagePayload])

    const handleFilesChange: Dispatch<SetStateAction<File[]>> = files => {
        const files_ = typeof files === 'function' ? files(currentFiles) : files

        if (files_.length > 0) {
            const file = files_[0]
            if (file.size > MAX_IMAGE_SIZE_BYTES) {
                addToast({
                    title: 'Imagem muito grande',
                    description: `A imagem deve ter no máximo ${MAX_IMAGE_SIZE_MB}MB. Comprima ou escolha um arquivo menor.`,
                    color: 'danger',
                })
                return
            }
            if (file.size > 0) {
                const reader = new FileReader()
                reader.onload = e => {
                    const result = e.target?.result as string
                    form.setValue('src', result)
                }
                reader.readAsDataURL(file)
            }
        } else {
            form.setValue('src', '')
        }

        setCurrentFiles(files_)
    }

    const handleSubmit = form.handleSubmit(async data => {
        try {
            setIsSubmitting(true)

            if (isCreateMode) {
                const result = await createImage(data)
                if (result.status === 'success') {
                    form.reset()
                    setSharedMenuData('selectedImageId', null)
                    setSharedMenuData('selectedImagePayload', null)
                    router.refresh()
                    addToast({
                        title: 'Imagem criada com sucesso',
                        description: 'Já está salvo na galeria! 🎉',
                        color: 'success',
                    })
                } else if (result.status === 'error') {
                    addToast({
                        title: 'Erro ao criar imagem',
                        description: result.error,
                        color: 'danger',
                    })
                }
            } else {
                const result = await updateImage({
                    ...data,
                    _id: selectedImageId,
                })
                if (result.status === 'success') {
                    setSharedMenuData('selectedImagePayload', {
                        src: result.payload.src,
                        name: result.payload.name,
                        alt: result.payload.alt,
                        title: result.payload.title,
                    })
                    setSharedMenuData('selectedImageId', result.payload._id)
                    addToast({
                        title: 'Imagem atualizada com sucesso',
                        description: 'Já está salvo na galeria! 🎉',
                        color: 'success',
                    })
                } else if (result.status === 'error') {
                    addToast({
                        title: 'Erro ao atualizar imagem',
                        description: result.error,
                        color: 'danger',
                    })
                }
            }
        } catch {
            addToast({
                title: 'Erro ao salvar imagem',
                description: 'Tente novamente mais tarde',
                color: 'danger',
            })
        } finally {
            setIsSubmitting(false)
            setSharedMenuData('selectedImageTrigger', true)
        }
    })

    const createConstants = galleryPropertiesConstants.CREATE
    const editConstants = galleryPropertiesConstants.EDIT

    const previewUrl = form.watch('src')

    return {
        form,
        isCreateMode,
        isSubmitting,
        handleFilesChange,
        handleSubmit,
        currentFiles,
        createConstants,
        editConstants,
        previewUrl,
    }
}
