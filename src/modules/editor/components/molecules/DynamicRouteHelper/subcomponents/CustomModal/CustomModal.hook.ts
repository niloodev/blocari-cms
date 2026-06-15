import { useState, useCallback, useEffect } from 'react'
import { DragState, Position } from './CustomModal.types'

export function useCustomModal({ isOpen }: { isOpen: boolean }) {
    const [dragState, setDragState] = useState<DragState>({
        isDragging: false,
        startPosition: { x: 0, y: 0 },
        currentPosition: { x: 0, y: 0 },
    })

    const [modalPosition, setModalPosition] = useState<Position>({ x: 0, y: 0 })

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        setDragState({
            isDragging: true,
            startPosition: { x: e.clientX, y: e.clientY },
            currentPosition: { x: e.clientX, y: e.clientY },
        })
    }, [])

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (!dragState.isDragging) return

            const deltaX = e.clientX - dragState.startPosition.x
            const deltaY = e.clientY - dragState.startPosition.y

            setModalPosition(prev => ({
                x: prev.x + deltaX,
                y: prev.y + deltaY,
            }))

            setDragState(prev => ({
                ...prev,
                startPosition: { x: e.clientX, y: e.clientY },
            }))
        },
        [dragState.isDragging, dragState.startPosition],
    )

    const handleMouseUp = useCallback(() => {
        setDragState(prev => ({ ...prev, isDragging: false }))
    }, [])

    useEffect(() => {
        if (dragState.isDragging) {
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)

            return () => {
                document.removeEventListener('mousemove', handleMouseMove)
                document.removeEventListener('mouseup', handleMouseUp)
            }
        }
    }, [dragState.isDragging, handleMouseMove, handleMouseUp])

    const centerModal = useCallback(() => {
        const centerX = (window.innerWidth - 600) / 2
        const centerY = (window.innerHeight - 400) / 2
        setModalPosition({ x: centerX, y: centerY })
    }, [])

    useEffect(() => {
        if (isOpen) {
            centerModal()
        }
    }, [isOpen, centerModal])

    return {
        modalPosition,
        handleMouseDown,
        isDragging: dragState.isDragging,
    }
}
