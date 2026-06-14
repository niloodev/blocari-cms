import { useEffect, useState } from 'react'
import { usePuck } from '@measured/puck'
import { sets } from '@/sets'

export function usePropertyComponentHeader() {
    const { appState } = usePuck()
    const [hierarchy, setHierarchy] = useState<string[]>([])

    const components = appState.data.content
    const selectedComponent = appState.ui.itemSelector

    useEffect(() => {
        if (selectedComponent) {
            const componentDropzone: string =
                selectedComponent.zone ?? 'default-zone'
            let componentKey: string = components[selectedComponent.index]?.type

            if (componentDropzone != 'default-zone' && appState.data.zones) {
                componentKey =
                    appState.data.zones[componentDropzone][
                        selectedComponent.index
                    ]?.type
            }

            const dropzoneLabel =
                componentDropzone == 'default-zone'
                    ? 'Página'
                    : (sets[componentDropzone.split('-')[0]]?.label ?? 'Página')

            setHierarchy(
                [
                    dropzoneLabel,
                    sets[componentKey]?.label ?? componentKey,
                ].filter(v => !!v),
            )
        } else setHierarchy(['Página'])
    }, [appState.data.zones, components, selectedComponent, setHierarchy])

    return { hierarchy, componentName: hierarchy[hierarchy.length - 1] }
}
