/* eslint-disable @typescript-eslint/no-explicit-any */
import { Menu } from '@/modules/editor/editor.types'
import { createEditorStore } from './editorSlice'
import { IPage } from '@/core/models/pages'

export interface EditorState {
    isLoading: boolean
    selectedMenu: Menu
    publishedData: IPage | null
    sharedMenuData: Record<string, any>
}

export interface EditorActions {
    setSelectedMenu: (menu: Menu) => void
    setPublishedData: (data: IPage) => void
    setIsLoading: (isLoading: boolean) => void
    setSharedMenuData: (key: string, value: any) => void
    clearSharedMenuData: (key?: string) => void
}

export type EditorStore = EditorState & EditorActions

export interface EditorStoreProviderProps {
    children: React.ReactNode
    initialState: EditorState
    initialStore?: EditorStoreApi
}

export interface EditorRouterHook {
    push: (path: string) => void
    replace: (path: string) => void
    back: () => void
    forward: () => void
}

export type EditorStoreApi = ReturnType<typeof createEditorStore>
