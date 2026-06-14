'use client'

import { ChangeEvent, useCallback, useRef, MouseEvent } from 'react'
import { FieldFilesHookProps } from './FieldFiles.types'

export function useFieldFiles({ onValueChange }: FieldFilesHookProps) {
    const inputRef = useRef<HTMLInputElement>(null)

    const handleOnClick = useCallback((e: MouseEvent<HTMLInputElement>) => {
        ;(e.target as unknown as { value: string }).value = ''
    }, [])

    const addFile = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0]
            if (file) onValueChange?.(prev => [...prev, file])
        },
        [onValueChange],
    )

    return { inputRef, addFile, handleOnClick }
}
