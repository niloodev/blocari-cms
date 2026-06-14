import { EditorPageClient } from './EditorPage.client'
import { getPageById } from '@/core/controllers/pages'
import { EditorPageProps } from './EditorPage.types'
import { EditorStoreProvider } from '@/modules/editor/store/editorSlice'
import { defaultEditorState } from '@/modules/editor/store/editorSlice/editorSlice'
import { redirect } from 'next/navigation'
import { EditorProviders } from '@/modules/editor/providers'
import '@measured/puck/puck.css'

export async function EditorPage({ id }: EditorPageProps) {
    let initialData
    try {
        if (id) {
            initialData = await getPageById(id)
            if ('error' in initialData || !initialData?.payload?._id)
                throw new Error('Página não encontrada')
        }
    } catch {
        redirect('/admin/editor')
    }

    return (
        <EditorProviders>
            <EditorStoreProvider
                initialState={{
                    ...defaultEditorState,
                    publishedData: initialData?.payload ?? null,
                }}
            >
                <EditorPageClient initialPage={initialData?.payload} />
            </EditorStoreProvider>
        </EditorProviders>
    )
}
