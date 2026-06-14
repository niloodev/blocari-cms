'use client'

import { ToastProvider, HeroUIProvider } from '@heroui/react'
import { StyledComponentsRegistry } from './StyledComponentsRegistry'

export function AdminProviders({ children }: { children: React.ReactNode }) {
    return (
        <HeroUIProvider>
            <ToastProvider placement="top-center" toastOffset={5} />
            {children}
        </HeroUIProvider>
    )
}

export function GlobalProviders({ children }: { children: React.ReactNode }) {
    return <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
}
