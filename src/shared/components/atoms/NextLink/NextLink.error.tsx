import Link from 'next/link'
import { ComponentProps } from 'react'

export const NextLinkError = ({
    children,
    ...props
}: ComponentProps<typeof Link>) => {
    return <Link {...props}>{children}</Link>
}
