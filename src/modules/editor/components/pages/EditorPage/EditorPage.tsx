import { EditorPageClient } from './EditorPage.client'
import { getPageById } from '@/core/controllers/pages'
import { EditorPageProps } from './EditorPage.types'
import {
    EditorStoreProvider,
    defaultEditorState,
} from '@/modules/editor/store/editorSlice'
import { redirect } from 'next/navigation'
import '@measured/puck/puck.css'

export async function EditorPage({ id }: EditorPageProps) {
    let page
    try {
        if (id) {
            page = await getPageById(id)
            if (page?.status == 'error' || !page?.payload?._id)
                throw new Error('Página não encontrada')
        }
    } catch {
        redirect('/admin/editor')
    }

    await new Promise(resolve => setTimeout(resolve, 500))

    return (
        <EditorStoreProvider
            initialState={{
                ...defaultEditorState,
                publishedData: page?.payload ?? null,
            }}
        >
            <EditorPageClient initialPage={page?.payload} />
        </EditorStoreProvider>
    )
}
