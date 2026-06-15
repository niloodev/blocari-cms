'use client'

import { useContext, useCallback } from 'react'

import { EditorStoreContext } from './editorSlice.context'
import { useRouter } from 'next/navigation'
import { useStore } from 'zustand'
import { EditorRouterHook } from './editorSlice.types'

export const useEditor = () => {
    const store = useContext(EditorStoreContext)
    if (!store)
        throw new Error('useEditor must be used within a EditorStoreProvider')
    return useStore(store)
}

export const useEditorRouter = (): EditorRouterHook => {
    const router = useRouter()
    const { setIsLoading } = useEditor()

    const push = useCallback(
        (path: string) => {
            setIsLoading(true)
            router.push(path)
        },
        [router, setIsLoading],
    )

    const replace = useCallback(
        (path: string) => {
            setIsLoading(true)
            router.replace(path)
        },
        [router, setIsLoading],
    )

    const back = useCallback(() => {
        setIsLoading(true)
        router.back()
    }, [router, setIsLoading])

    const forward = useCallback(() => {
        setIsLoading(true)
        router.forward()
    }, [router, setIsLoading])

    return { push, replace, back, forward }
}
