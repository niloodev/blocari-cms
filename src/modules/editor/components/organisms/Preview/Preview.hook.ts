import { usePuck } from '@measured/puck'
import { useEffect, useRef, useState } from 'react'

export function usePreview() {
    const { appState } = usePuck()
    const ref = useRef<HTMLDivElement>(null)
    const [scale, setScale] = useState<number>(1)
    const [height, setHeight] = useState<number>(0)

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

    return { ref, previewWidth, height, scale }
}
