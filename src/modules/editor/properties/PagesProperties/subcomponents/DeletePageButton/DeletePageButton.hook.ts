import { useEditor } from '@/modules/editor/store'
import { usePageMutation } from '@/modules/editor/hooks'
import { useDisclosure } from '@/shared/libs/heroui'
import { useCallback } from 'react'
import { Data } from '@measured/puck'

export function useDeletePageButton() {
    const { publishedData } = useEditor()
    const { mutate, isLoading } = usePageMutation({ mutationType: 'delete' })
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    const handleDelete = useCallback(async () => {
        await mutate({
            id: publishedData?._id,
            data: publishedData?.content ?? ({} as Data),
        })
    }, [mutate, publishedData?._id, publishedData?.content])

    return {
        pageId: publishedData?._id,
        isOpen,
        onOpen,
        onOpenChange,
        handleDelete,
        isLoading,
    }
}
