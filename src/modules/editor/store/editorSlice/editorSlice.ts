import { createStore } from 'zustand'

import { defaultMenu } from '@/modules/editor/editor.constants'
import { Menu } from '@/modules/editor/editor.types'
import { EditorState, EditorStore } from './editorSlice.types'
import { IPage } from '@/core/models/pages'

export const defaultEditorState: EditorState = {
    selectedMenu: defaultMenu,
    publishedData: null,
}

export const createEditorStore = (initialState: EditorState) => {
    return createStore<EditorStore>()(set => ({
        ...initialState,
        setSelectedMenu: (menu: Menu) => set(() => ({ selectedMenu: menu })),
        setPublishedData: (data: IPage) => set(() => ({ publishedData: data })),
    }))
}
