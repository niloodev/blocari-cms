import { useEditor } from '@/modules/editor/store'
import { usePuck } from '@measured/puck'
import { useEffect, useRef, useState } from 'react'

export function usePreview() {
    const { appState } = usePuck()
    const { isLoading } = useEditor()

    const ref = useRef<HTMLDivElement>(null)
    const [scale, setScale] = useState<number>(1)
    const [height, setHeight] = useState<number>(0)
    const [debouncedLoading, setDebouncedLoading] = useState<boolean>(false)

    const previewWidth = appState.ui.viewports.current.width

    useEffect(() => {
        if (!ref?.current) return

        const calculateProportions = () => {
            const sectionHeight = ref.current!.clientHeight
            const sectionWidth = ref.current!.clientWidth

            const scale = Math.min(sectionWidth / previewWidth, 1)
            const inverseScale = Math.max(previewWidth / sectionWidth, 1)

            setScale(scale)
            setHeight(inverseScale * sectionHeight)
        }

        calculateProportions()

        window.addEventListener('resize', calculateProportions)
        return () => window.removeEventListener('resize', calculateProportions)
    }, [ref, previewWidth])

    useEffect(() => {
        if (isLoading) setDebouncedLoading(true)
        else {
            const timeout = setTimeout(() => {
                setDebouncedLoading(false)
            }, 500)
            return () => clearTimeout(timeout)
        }
    }, [isLoading])

    return { ref, previewWidth, height, scale, isLoading: debouncedLoading }
}
