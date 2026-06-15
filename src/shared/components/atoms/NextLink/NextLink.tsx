'use client'

import Link from 'next/link'
import { usePuck } from '@measured/puck'
import { ComponentProps } from 'react'
import { NextLinkError } from './NextLink.error'

export function NextLink({ children, ...props }: ComponentProps<typeof Link>) {
    try {
        usePuck()
        return (
            <span {...props} style={{ pointerEvents: 'none' }}>
                {children}
            </span>
        )
    } catch {
        return <NextLinkError {...props}>{children}</NextLinkError>
    }
}
