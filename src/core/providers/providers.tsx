'use client'

import { ToastProvider, HeroUIProvider } from '@/shared/libs/heroui'
import { StyledComponentsRegistry } from './StyledComponentsRegistry'
import { NextThemesProvider } from './NextThemesProvider'

export function AdminProviders({ children }: { children: React.ReactNode }) {
    return (
        <HeroUIProvider>
            <NextThemesProvider>
                <ToastProvider placement="bottom-right" toastOffset={5} />
                {children}
            </NextThemesProvider>
        </HeroUIProvider>
    )
}

export function GlobalProviders({ children }: { children: React.ReactNode }) {
    return <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
}
