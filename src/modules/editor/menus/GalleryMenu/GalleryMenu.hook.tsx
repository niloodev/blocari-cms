import { useCallback, useState, useEffect } from 'react'
import { useEditor } from '@/modules/editor/store'
import { IImage } from '@/core/models/images'
import { getImages } from '@/core/controllers/images'
import { usePuck } from '@measured/puck'
import { IImageControllerResponse } from '@/core/controllers/images/images.types'

export function useGalleryMenu() {
    const { sharedMenuData, setSharedMenuData } = useEditor()
    const { dispatch } = usePuck()
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState<IImage[]>([])

    useEffect(() => {
        setSharedMenuData('selectedImageId', null)
        setSharedMenuData('selectedImagePayload', null)
    }, [setSharedMenuData])

    useEffect(() => {
        setIsLoading(true)
        setSharedMenuData('selectedImageTrigger', false)
        getImages()
            .then((res: IImageControllerResponse<IImage[]>) => {
                if (res.status === 'error') {
                    // Tratar erro sem lançar exceção
                    console.error('Erro ao carregar imagens:', res.error)
                    setData([])
                    return
                }
                setData(res.payload || [])
            })
            .catch(error => {
                // Tratar erro de rede ou outros erros
                console.error('Erro ao carregar imagens:', error)
                setData([])
            })
            .finally(() => setIsLoading(false))
    }, [sharedMenuData.selectedImageTrigger, setSharedMenuData])

    const handleSelectImage = useCallback(
        (imageId = '') => {
            dispatch({
                type: 'setUi',
                ui: {
                    itemSelector: null,
                    field: {
                        focus: null,
                    },
                },
            })
            if (imageId) {
                setSharedMenuData('selectedImageId', imageId)
                setSharedMenuData('selectedImagePayload', {
                    src: data.find(image => image._id === imageId)?.src,
                    name: data.find(image => image._id === imageId)?.name,
                })
            } else {
                setSharedMenuData('selectedImageId', null)
                setSharedMenuData('selectedImagePayload', null)
            }
        },
        [setSharedMenuData, data, dispatch],
    )

    return {
        images: data,
        imageId: sharedMenuData.selectedImageId || null,
        handleSelectImage,
        isLoading,
    }
}
