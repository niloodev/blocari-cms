import { usePuck } from '@measured/puck'
import { useEditor } from '@/modules/editor/store'

export function useComponentProperties() {
    const { appState } = usePuck()
    const { isLoading } = useEditor()

    const haveComponentSelected = appState.ui.itemSelector

    return {
        haveComponentSelected,
        isLoading,
    }
}
