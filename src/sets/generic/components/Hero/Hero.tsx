'use client'

import { DropZone } from '@measured/puck'
import { HeroProps } from './Hero.fields'
import { useHeroParallax } from './Hero.hook'
import {
    StyledHero,
    StyledGlow,
    StyledFloatingBlock,
    StyledContent,
    StyledEyebrow,
    StyledTitle,
    StyledSubtitle,
    StyledActions,
} from './Hero.styles'

const blocks = [
    { color: '#e55b5b', size: 64, top: '18%', left: '12%', depth: 1.4 },
    { color: '#ec7e7e', size: 40, top: '26%', left: '82%', depth: 0.8 },
    { color: '#b83636', size: 52, top: '70%', left: '16%', depth: 1 },
    { color: '#f4a0a0', size: 34, top: '74%', left: '84%', depth: 0.6 },
]

export function Hero({ eyebrow, title, highlight, subtitle }: HeroProps) {
    const { ref, offset } = useHeroParallax()

    return (
        <StyledHero ref={ref}>
            <StyledGlow
                style={{ x: offset.x * 0.6, y: offset.y * 0.6 }}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
            />

            {blocks.map((block, index) => (
                <StyledFloatingBlock
                    key={index}
                    $color={block.color}
                    $size={block.size}
                    $top={block.top}
                    $left={block.left}
                    style={{
                        x: offset.x * block.depth,
                        y: offset.y * block.depth,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        rotate: [0, 8, -6, 0],
                    }}
                    transition={{
                        opacity: { duration: 0.6, delay: 0.3 + index * 0.1 },
                        scale: {
                            duration: 0.6,
                            delay: 0.3 + index * 0.1,
                            type: 'spring',
                        },
                        rotate: {
                            duration: 6 + index,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        },
                    }}
                />
            ))}

            <StyledContent
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.12 } },
                }}
            >
                {eyebrow && (
                    <StyledEyebrow
                        variants={{
                            hidden: { opacity: 0, y: 16 },
                            visible: { opacity: 1, y: 0 },
                        }}
                    >
                        {eyebrow}
                    </StyledEyebrow>
                )}

                <StyledTitle
                    variants={{
                        hidden: { opacity: 0, y: 24 },
                        visible: { opacity: 1, y: 0 },
                    }}
                >
                    {title} {highlight && <span>{highlight}</span>}
                </StyledTitle>

                {subtitle && (
                    <StyledSubtitle
                        variants={{
                            hidden: { opacity: 0, y: 24 },
                            visible: { opacity: 1, y: 0 },
                        }}
                    >
                        {subtitle}
                    </StyledSubtitle>
                )}

                <StyledActions
                    variants={{
                        hidden: { opacity: 0, y: 24 },
                        visible: { opacity: 1, y: 0 },
                    }}
                >
                    <DropZone
                        zone="hero-actions"
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '16px',
                        }}
                    />
                </StyledActions>
            </StyledContent>
        </StyledHero>
    )
}
