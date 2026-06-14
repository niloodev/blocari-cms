import { IPage } from '@/core/models/pages'

export interface EditorPageProps {
    id?: string
}

export interface EditorPageClientProps extends EditorPageProps {
    initialPage?: IPage
}
