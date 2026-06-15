import { ArrowRight, ExternalLink, LayoutDashboard } from 'lucide-react'
import { ButtonProps } from './Button.fields'
import { StyledButton } from './Button.styles'

function GithubIcon() {
    return (
        <svg
            data-icon="github"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1-.02-1.96-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.14 0 1.54-.01 2.79-.01 3.17 0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
        </svg>
    )
}

const icons = {
    none: null,
    github: <GithubIcon />,
    admin: <LayoutDashboard data-icon="admin" />,
    arrow: <ArrowRight data-icon="arrow" />,
    external: <ExternalLink data-icon="external" />,
}

export function Button({ text, href, variant, size, icon, newTab }: ButtonProps) {
    return (
        <StyledButton
            href={href || '#'}
            role="link"
            hrefLang="pt-br"
            target={newTab === 'yes' ? '_blank' : undefined}
            rel={newTab === 'yes' ? 'noopener noreferrer' : undefined}
            $variant={variant}
            $size={size}
        >
            {text}
            {icons[icon]}
        </StyledButton>
    )
}
