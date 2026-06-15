'use client'

import { createContext, useEffect, useRef } from 'react'
import { EditorStoreApi, EditorStoreProviderProps } from './editorSlice.types'
import { createEditorStore } from './editorSlice'

export const EditorStoreContext = createContext<EditorStoreApi | undefined>(
    undefined,
)

export const EditorStoreProvider = ({
    children,
    initialState,
    initialStore,
}: EditorStoreProviderProps) => {
    const storeRef = useRef<EditorStoreApi | null>(initialStore)

    if (!storeRef.current) storeRef.current = createEditorStore(initialState)

    useEffect(() => {
        storeRef.current!.setState(prev => ({
            ...prev,
            publishedData: initialState?.publishedData ?? null,
            isLoading: false,
        }))
    }, [initialState, storeRef])

    return (
        <EditorStoreContext.Provider value={storeRef.current}>
            {children}
        </EditorStoreContext.Provider>
    )
}
