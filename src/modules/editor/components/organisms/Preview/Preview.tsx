'use client'

import { Puck } from '@measured/puck'
import { usePreview } from './Preview.hook'
import { motion } from 'motion/react'
import { PreviewLoading } from './Preview.loading'

export function Preview() {
    const { ref, previewWidth, height, scale, isLoading } = usePreview()

    return (
        <motion.div
            className="flex-1 relative p-[2px] overflow-hidden max-h-full bg-content2 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            {isLoading && <PreviewLoading />}
            <motion.div
                className="w-full h-full flex justify-center"
                ref={ref}
                animate={{ opacity: isLoading ? 0 : 1 }}
            >
                <div
                    style={{
                        minWidth: `${previewWidth}px`,
                        height: `${height}px`,
                        transform: `scale(${scale})`,
                        transformOrigin: 'top',
                    }}
                    className="transition-[min-width] duration-[0.3s] ease-[ease-in-out]"
                    data-testid="preview-wrapper"
                >
                    <Puck.Preview />
                </div>
            </motion.div>
        </motion.div>
    )
}
