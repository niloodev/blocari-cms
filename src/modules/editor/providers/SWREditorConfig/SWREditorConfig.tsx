'use client'

import { SWRConfig } from 'swr'
import { SWREditorConfigProps } from './SWREditorConfig.types'
import { addToast } from '@heroui/react'

export function SWREditorConfig({ children }: SWREditorConfigProps) {
    return (
        <SWRConfig
            value={{
                onSuccess: data => {
                    if ('error' in data)
                        addToast({
                            title: 'Oops! Algo de errado aconteceu.',
                            description: data.error,
                            color: 'danger',
                        })
                },
            }}
        >
            {children}
        </SWRConfig>
    )
}
