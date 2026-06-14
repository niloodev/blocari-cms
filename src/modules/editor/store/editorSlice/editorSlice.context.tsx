'use client'
import { createContext, useContext, useRef } from 'react'
import { EditorStoreApi, EditorStoreProviderProps } from './editorSlice.types'
import { createEditorStore } from './editorSlice'
import { useStore } from 'zustand'

export const EditorStoreContext = createContext<EditorStoreApi | undefined>(
    undefined,
)

export const EditorStoreProvider = ({
    children,
    initialState,
}: EditorStoreProviderProps) => {
    const storeRef = useRef<EditorStoreApi | null>(null)

    if (!storeRef.current) storeRef.current = createEditorStore(initialState)

    return (
        <EditorStoreContext.Provider value={storeRef.current}>
            {children}
        </EditorStoreContext.Provider>
    )
}

export const useEditor = () => {
    const store = useContext(EditorStoreContext)
    if (!store)
        throw new Error('useEditor must be used within a EditorStoreProvider')
    return useStore(store)
}
