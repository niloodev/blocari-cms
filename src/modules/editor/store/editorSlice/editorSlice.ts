/* eslint-disable @typescript-eslint/no-explicit-any */
import { createStore } from 'zustand'
import { defaultMenu } from '@/modules/editor/editor.constants'
import { Menu } from '@/modules/editor/editor.types'
import { EditorState, EditorStore } from './editorSlice.types'
import { IPage } from '@/core/models/pages'

export const defaultEditorState: EditorState = {
    selectedMenu: defaultMenu,
    publishedData: null,
    isLoading: true,
    sharedMenuData: {},
}

export const createEditorStore = (initialState: EditorState) => {
    return createStore<EditorStore>()(set => ({
        ...initialState,
        setSelectedMenu: (menu: Menu) => set(() => ({ selectedMenu: menu })),
        setPublishedData: (data: IPage) => set(() => ({ publishedData: data })),
        setIsLoading: (isLoading: boolean) => set(() => ({ isLoading })),
        setSharedMenuData: (key: string, value: any) =>
            set(state => ({
                sharedMenuData: {
                    ...state.sharedMenuData,
                    [key]: value,
                },
            })),
        clearSharedMenuData: (key?: string) =>
            set(state => ({
                sharedMenuData: key
                    ? Object.fromEntries(
                          Object.entries(state.sharedMenuData).filter(
                              ([k]) => k !== key,
                          ),
                      )
                    : {},
            })),
    }))
}
