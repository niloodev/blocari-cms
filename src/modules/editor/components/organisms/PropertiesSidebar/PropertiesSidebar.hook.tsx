import { useEditor } from '@/modules/editor/store'
import { usePuck } from '@measured/puck'
import { useEffect, useMemo } from 'react'
import * as propertiesModules from '@/modules/editor/properties'

export function usePropertiesSidebar() {
    const { appState, dispatch } = usePuck()
    const { selectedMenu } = useEditor()

    const componentIsSelected = !!appState.ui.itemSelector

    const Properties = useMemo(() => {
        if (componentIsSelected) return propertiesModules.ComponentsProperties

        return selectedMenu?.properties
            ? propertiesModules[selectedMenu.properties]
            : () => <></>
    }, [componentIsSelected, selectedMenu])

    useEffect(() => {
        dispatch({
            type: 'setUi',
            ui: {
                itemSelector: null,
                field: {
                    focus: null,
                },
            },
        })
    }, [dispatch, selectedMenu])

    return {
        Properties,
    }
}
