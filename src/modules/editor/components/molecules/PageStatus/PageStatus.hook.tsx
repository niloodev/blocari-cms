import { usePuck } from '@measured/puck'
import { isEqual } from 'lodash'

import { useEditor } from '@/modules/editor/store/editorSlice'
import { useMemo } from 'react'
import { Check, CircleDashed } from 'lucide-react'

export function usePageStatus() {
    const { appState } = usePuck()
    const { publishedData } = useEditor()

    const isDraft = useMemo(() => {
        const contentWithoutEmpty = Object.entries(publishedData?.content || {})
            .filter(([, value]) => {
                if (!value || typeof value !== 'object') return true
                return Object.keys(value).length > 0
            })
            .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})

        const dataWithoutEmpty = Object.entries(appState.data || {})
            .filter(([, value]) => {
                if (!value || typeof value !== 'object') return true
                return Object.keys(value).length > 0
            })
            .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})

        return !isEqual(contentWithoutEmpty, dataWithoutEmpty)
    }, [publishedData?.content, appState.data])

    const pageName = useMemo(() => {
        return appState?.data?.root?.props?.title || 'Sem título'
    }, [appState?.data?.root?.props?.title])

    const status = {
        published: (
            <span className="leading-[110%] text-[#17C964] text-xs flex gap-0.5 items-center">
                Publicado
                <Check color="#17C964" strokeWidth={3} width={12} height={12} />
            </span>
        ),
        draft: (
            <span className="leading-[110%] text-[#FF9800] text-xs flex gap-1 items-center">
                Rascunho
                <CircleDashed
                    color="#FF9800"
                    strokeWidth={3}
                    width={12}
                    height={12}
                />
            </span>
        ),
    }

    return {
        isDraft,
        status,
        pageName,
    }
}
