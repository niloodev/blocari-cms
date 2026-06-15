'use client'

import { motion } from 'motion/react'
import { SectionHeaderProps } from './SectionHeader.fields'
import { StyledSectionHeader } from './SectionHeader.styles'

const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
}

export function SectionHeader({
    eyebrow,
    title,
    subtitle,
    align,
    puck: { dragRef, isEditing },
}: SectionHeaderProps) {
    return (
        <StyledSectionHeader
            ref={isEditing ? dragRef : null}
            $align={align}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
            }}
        >
            {eyebrow && (
                <motion.span className="eyebrow" variants={item}>
                    {eyebrow}
                </motion.span>
            )}
            {title && (
                <motion.h2 variants={item}>{title}</motion.h2>
            )}
            {subtitle && (
                <motion.p variants={item}>{subtitle}</motion.p>
            )}
        </StyledSectionHeader>
    )
}
