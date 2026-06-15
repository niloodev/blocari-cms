import { usePageMutation } from '@/modules/editor/hooks'
import { useEditor } from '@/modules/editor/store'
import { usePuck } from '@measured/puck'
import { useCallback } from 'react'

export function usePublishButton() {
    const { appState } = usePuck()
    const { publishedData } = useEditor()

    const pageId = publishedData?._id

    const { mutate, isLoading } = usePageMutation({
        mutationType: pageId ? 'update' : 'create',
    })

    const handlePublish = useCallback(async () => {
        await mutate({
            id: pageId,
            data: appState.data,
        })
    }, [mutate, pageId, appState.data])

    return {
        pageId,
        handlePublish,
        isLoading,
    }
}
