import { usePuck } from '@measured/puck'

export function useComponentProperties() {
    const { appState } = usePuck()

    const haveComponentSelected = appState.ui.itemSelector

    return {
        haveComponentSelected,
    }
}
