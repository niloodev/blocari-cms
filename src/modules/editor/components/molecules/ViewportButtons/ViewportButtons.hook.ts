import { usePuck, Viewport } from '@measured/puck'
import { useCallback } from 'react'

export function useViewportButtons() {
    const { appState, dispatch } = usePuck()
    const currentViewport = appState.ui.viewports.current

    const defineViewport = useCallback(
        (viewport: Viewport) => {
            dispatch({
                type: 'setUi',
                ui: {
                    viewports: {
                        current: {
                            width: viewport.width,
                            height: viewport.height ?? 'auto',
                        },
                        controlsVisible: true,
                        options: [],
                    },
                },
            })
        },
        [dispatch],
    )

    return { currentViewport, defineViewport }
}
