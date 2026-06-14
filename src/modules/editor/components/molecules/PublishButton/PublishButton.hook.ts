import { createOrUpdatePage } from '@/modules/editor/services'
import { useEditor } from '@/modules/editor/store'
import { usePuck } from '@measured/puck'
import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'

export function usePublishButton() {
    const { appState } = usePuck()
    const { publishedData, setPublishedData } = useEditor()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const pageId = publishedData?._id

    const handlePublish = useCallback(async () => {
        setIsLoading(true)
        createOrUpdatePage({
            id: pageId,
            data: appState.data,
            setPublishedData,
        }).finally(() => {
            setIsLoading(false)
        })
    }, [appState.data, pageId, setPublishedData, setIsLoading])

    return {
        pageId,
        handlePublish,
        isLoading,
        router,
    }
}
