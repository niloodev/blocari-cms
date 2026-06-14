import { Data } from '@measured/puck'
import { EditorActions } from '@/modules/editor/store/editorSlice/editorSlice.types'

export interface CreateOrUpdatePageProps {
    id?: string
    setPublishedData: EditorActions['setPublishedData']
    data: Data
}
