import { useEffect, useRef, useState } from 'react'

/**
 * Cria um leve efeito de paralaxe nos blocos/glow do Hero conforme o
 * movimento do mouse. Desativado em telas pequenas e fora do navegador
 * (ex.: durante a renderização no editor sem janela).
 */
export function useHeroParallax() {
    const ref = useRef<HTMLDivElement>(null)
    const [offset, setOffset] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const nearestWindow = ref.current?.ownerDocument?.defaultView
        if (!nearestWindow || nearestWindow.innerWidth < 850) return

        const handleMouseMove = (event: MouseEvent) => {
            const { innerWidth, innerHeight } = nearestWindow
            const x = (event.clientX - innerWidth / 2) / innerWidth
            const y = (event.clientY - innerHeight / 2) / innerHeight
            setOffset({ x: x * 40, y: y * 40 })
        }

        nearestWindow.addEventListener('mousemove', handleMouseMove)
        return () =>
            nearestWindow.removeEventListener('mousemove', handleMouseMove)
    }, [])

    return { ref, offset }
}
