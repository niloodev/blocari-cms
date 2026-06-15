'use client'

import { StyleSheetManager } from 'styled-components'
import { ViewportStyledInjectionProps } from './ViewportStyledInjection.types'
import { useEffect } from 'react'

export function ViewportStyledInjection({
    children,
    document,
}: ViewportStyledInjectionProps) {
    useEffect(() => {
        if (!document) return

        const style = document?.createElement('style')
        style.innerHTML = `
            html {
                background-color: #FFF !important;
            }
        `
        document?.body?.insertBefore(style, document?.body?.firstChild)
    }, [document])

    return (
        <StyleSheetManager target={document?.body}>
            {children}
        </StyleSheetManager>
    )
}
