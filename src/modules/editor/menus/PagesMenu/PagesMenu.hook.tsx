import {
    startTransition,
    useCallback,
    useOptimistic,
    useState,
    useEffect,
} from 'react'
import { useEditor, useEditorRouter } from '@/modules/editor/store'
import { IPage } from '@/core/models/pages'
import { useSearchParams } from 'next/navigation'
import { getPages } from '@/core/controllers/pages'
import { usePuck } from '@measured/puck'

export function usePagesMenu() {
    const { push } = useEditorRouter()
    const { dispatch } = usePuck()
    const { publishedData } = useEditor()
    const searchParams = useSearchParams()
    const stringParams = searchParams.toString()
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState<IPage[]>([])
    const [search, setSearch] = useState<string>('')

    const [debouncedSearch, setDebouncedSearch] = useState(search)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search)
        }, 1000)

        return () => {
            clearTimeout(handler)
        }
    }, [search])

    const [optimisticPublishedData, setOptimisticPublishedData] = useOptimistic(
        publishedData,
        (state, newId) => {
            return {
                ...state,
                _id: newId,
            } as IPage
        },
    )

    useEffect(() => {
        setIsLoading(true)
        getPages(undefined, debouncedSearch)
            .then(res => {
                if (res.status == 'error') {
                    setData(() => {
                        throw new Error(res.error)
                    })
                    return
                }
                setData(res.payload)
            })
            .finally(() => setIsLoading(false))
    }, [
        stringParams,
        publishedData?.content?.root?.props?.title,
        debouncedSearch,
    ])

    const handleSelectPage = useCallback(
        (pageId = '') => {
            startTransition(() => {
                setOptimisticPublishedData(pageId)
                dispatch({
                    type: 'setUi',
                    ui: {
                        itemSelector: null,
                    },
                })
                if (pageId) push(`/admin/editor?id=${pageId}`)
                else push('/admin/editor')
            })
        },
        [push, setOptimisticPublishedData, dispatch],
    )

    return {
        pages: data,
        pageId: optimisticPublishedData?._id,
        handleSelectPage,
        isLoading,
        search,
        setSearch,
    }
}
