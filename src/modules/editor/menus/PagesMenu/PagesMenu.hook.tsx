import { useCallback } from 'react'
import { useEditor } from '@/modules/editor/store'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'
import { getPages } from '@/core/controllers/pages'

export function usePagesMenu() {
    const router = useRouter()
    const { publishedData } = useEditor()

    const { data, isLoading } = useSWR(['getPages', publishedData], getPages)
    if (data && 'error' in data) throw data

    const handleSelectPage = useCallback(
        (pageId: string) => {
            router.push(`/admin/editor/${pageId}`)
        },
        [router],
    )

    return {
        pages: data?.payload ?? [],
        pageId: publishedData?._id,
        handleSelectPage,
        isLoading,
    }
}
