'use client'

import { BadgeProps } from './Badge.fields'
import { StyledBadge } from './Badge.styles'

export function Badge({
    text,
    tone,
    dot,
    puck: { dragRef, isEditing },
}: BadgeProps) {
    return (
        <StyledBadge
            ref={isEditing ? dragRef : null}
            $tone={tone}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.4, type: 'spring' }}
        >
            {dot === 'yes' && <span className="dot" />}
            {text}
        </StyledBadge>
    )
}
