'use client'

import { BlockShowcaseProps } from './BlockShowcase.fields'
import {
    StyledShowcase,
    StyledStage,
    StyledBlock,
    StyledCaption,
} from './BlockShowcase.styles'

/* Posições baseadas no logo do Blocari (viewBox 100x100). */
const logoBlocks = [
    { color: '#e55b5b', x: 14, y: 14, w: 32, h: 72, from: { x: -60, y: -40 } },
    { color: '#ec7e7e', x: 54, y: 14, w: 32, h: 32, from: { x: 60, y: -50 } },
    { color: '#b83636', x: 54, y: 54, w: 32, h: 32, from: { x: 60, y: 50 } },
]

export function BlockShowcase({
    caption,
    puck: { dragRef, isEditing },
}: BlockShowcaseProps) {
    return (
        <StyledShowcase ref={isEditing ? dragRef : null}>
            <StyledStage>
                {logoBlocks.map((block, index) => (
                    <StyledBlock
                        key={index}
                        $color={block.color}
                        $x={block.x}
                        $y={block.y}
                        $w={block.w}
                        $h={block.h}
                        initial={{
                            opacity: 0,
                            x: block.from.x,
                            y: block.from.y,
                            rotate: -25,
                            scale: 0.5,
                        }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                            y: [0, -8, 0],
                            rotate: 0,
                            scale: 1,
                        }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{
                            opacity: { duration: 0.5, delay: index * 0.15 },
                            x: {
                                duration: 0.7,
                                delay: index * 0.15,
                                type: 'spring',
                                bounce: 0.4,
                            },
                            rotate: { duration: 0.7, delay: index * 0.15 },
                            scale: { duration: 0.7, delay: index * 0.15 },
                            y: {
                                duration: 3 + index,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: 0.8 + index * 0.2,
                            },
                        }}
                    />
                ))}
            </StyledStage>

            {caption && (
                <StyledCaption
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    {caption}
                </StyledCaption>
            )}
        </StyledShowcase>
    )
}
