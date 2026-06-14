import { Menu } from '@/modules/editor/editor.types'
import { createEditorStore } from './editorSlice'
import { IPage } from '@/core/models/pages'

export interface EditorState {
    selectedMenu: Menu
    publishedData: IPage | null
}

export interface EditorActions {
    setSelectedMenu: (menu: Menu) => void
    setPublishedData: (data: IPage) => void
}

export type EditorStore = EditorState & EditorActions

export interface EditorStoreProviderProps {
    children: React.ReactNode
    initialState: EditorState
}

export type EditorStoreApi = ReturnType<typeof createEditorStore>
