'use client'

import { Puck } from '@measured/puck'
import { usePreview } from './Preview.hook'
import { motion } from 'motion/react'

export function Preview() {
    const { ref, previewWidth, height, scale } = usePreview()

    return (
        <motion.div
            className="flex-1 relative p-[2px] overflow-hidden max-h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <div className="w-full h-full flex justify-center" ref={ref}>
                <div
                    style={{
                        minWidth: `${previewWidth}px`,
                        height: `${height}px`,
                        transform: `scale(${scale})`,
                        transformOrigin: 'top',
                    }}
                    className="transition-[min-width] duration-[0.3s] ease-[ease-in-out]"
                >
                    <Puck.Preview />
                </div>
            </div>
        </motion.div>
    )
}
