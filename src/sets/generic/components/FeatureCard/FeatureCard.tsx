'use client'

import {
    Blocks,
    MousePointerClick,
    Image as ImageIcon,
    Code,
    Palette,
    Database,
    Rocket,
    ShieldCheck,
    LayoutDashboard,
    Zap,
} from 'lucide-react'
import { FeatureCardProps, FeatureIcon } from './FeatureCard.fields'
import { StyledFeatureCard } from './FeatureCard.styles'

const icons: Record<FeatureIcon, React.ReactNode> = {
    blocks: <Blocks />,
    cursor: <MousePointerClick />,
    image: <ImageIcon />,
    code: <Code />,
    palette: <Palette />,
    database: <Database />,
    rocket: <Rocket />,
    shield: <ShieldCheck />,
    layout: <LayoutDashboard />,
    zap: <Zap />,
}

export function FeatureCard({
    icon,
    title,
    text,
    accent,
    index,
    puck: { dragRef, isEditing },
}: FeatureCardProps) {
    return (
        <StyledFeatureCard
            ref={isEditing ? dragRef : null}
            $accent={accent || '#e55b5b'}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                    duration: 0.45,
                    ease: 'easeOut',
                    delay: (index ?? 0) * 0.12,
                },
            }}
            whileHover={{ y: -8 }}
            viewport={{ once: true, amount: 0.3 }}
        >
            <div className="icon-wrap">{icons[icon] ?? icons.blocks}</div>
            <h3>{title}</h3>
            <p>{text}</p>
        </StyledFeatureCard>
    )
}
