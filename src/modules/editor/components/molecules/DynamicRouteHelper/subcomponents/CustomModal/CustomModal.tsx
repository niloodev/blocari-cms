'use client'

import { X } from 'lucide-react'
import { Button } from '@/shared/libs/heroui'
import {
    CustomModalProps,
    CustomModalHeaderProps,
    CustomModalBodyProps,
    CustomModalFooterProps,
} from './CustomModal.types'
import { useCustomModal } from './CustomModal.hook'
import { sizeClasses } from './CustomModal.constants'

export function CustomModal({
    isOpen,
    onClose,
    title,
    children,
    size = '2xl',
}: CustomModalProps) {
    const { modalPosition, handleMouseDown, isDragging } = useCustomModal({
        isOpen,
    })

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 pointer-events-none">
            <div
                className={`${sizeClasses[size]} max-h-[80vh] bg-content1 rounded-lg shadow-2xl border border-default-200 overflow-hidden pointer-events-auto`}
                style={{
                    transform: `translate(${modalPosition.x}px, ${modalPosition.y}px)`,
                    cursor: isDragging ? 'grabbing' : 'default',
                }}
            >
                <div
                    className="flex items-center justify-between p-4 bg-content2 border-b border-default-200 cursor-move select-none"
                    onMouseDown={handleMouseDown}
                >
                    <h2 className="text-lg font-semibold text-foreground">
                        {title}
                    </h2>
                    <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        onPress={onClose}
                        className="cursor-pointer"
                    >
                        <X size={16} />
                    </Button>
                </div>
                <div className="overflow-hidden">{children}</div>
            </div>
        </div>
    )
}

export function CustomModalHeader({ title, onClose }: CustomModalHeaderProps) {
    return (
        <div className="flex items-center justify-between p-4 bg-content2 border-b border-default-200">
            <h2 className="text-lg font-semibold text-foreground">{title}</h2>
            <Button isIconOnly size="sm" variant="light" onPress={onClose}>
                <X size={16} />
            </Button>
        </div>
    )
}

export function CustomModalBody({ children }: CustomModalBodyProps) {
    return <div className="p-4">{children}</div>
}

export function CustomModalFooter({ children }: CustomModalFooterProps) {
    return (
        <div className="flex items-center justify-end gap-2 p-4 bg-content2 border-t border-default-200">
            {children}
        </div>
    )
}
