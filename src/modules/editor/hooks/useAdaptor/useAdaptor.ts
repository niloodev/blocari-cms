import { adapters } from '@/adapters'
import { usePuck } from '@measured/puck'
import { useMemo } from 'react'

export function useAdaptor() {
    const { appState } = usePuck()

    const hasDynamicAdapter = useMemo(() => {
        const dynamicAdapter = appState?.data?.root?.props?.dynamicAdaptor
        return Boolean(dynamicAdapter && dynamicAdapter !== '')
    }, [appState?.data?.root?.props?.dynamicAdaptor])

    const currentAdapter = useMemo(() => {
        const dynamicAdapter = appState?.data?.root?.props
            ?.dynamicAdaptor as keyof typeof adapters
        if (!dynamicAdapter || !adapters[dynamicAdapter]) return null
        return adapters[dynamicAdapter]
    }, [appState?.data?.root?.props?.dynamicAdaptor])

    const mappedFields = useMemo(() => {
        if (!currentAdapter) return []
        return currentAdapter.availableMappedFields
    }, [currentAdapter])

    return { currentAdapter, hasDynamicAdapter, mappedFields }
}
