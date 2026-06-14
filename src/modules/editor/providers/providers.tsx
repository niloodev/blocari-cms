import { SWREditorConfig } from './SWREditorConfig'
import { EditorProvidersProps } from './providers.types'

export function EditorProviders({ children }: EditorProvidersProps) {
    return <SWREditorConfig>{children}</SWREditorConfig>
}
