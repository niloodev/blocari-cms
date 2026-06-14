'use client'

import { ChangeEvent, useCallback, useRef } from 'react'
import { FileRowHookProps } from './FileRow.types'

export function useFileRow({ index, onValueChange }: FileRowHookProps) {
    const specificInputRef = useRef<HTMLInputElement>(null)

    const replaceFile = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const newFile = e.target.files?.[0]
            if (newFile) {
                onValueChange?.(prev => {
                    const newPrev = [...prev]
                    newPrev[index] = newFile
                    return newPrev
                })
            }
        },
        [onValueChange, index],
    )

    const deleteFile = useCallback(
        () => onValueChange?.(prev => prev.filter((_, i) => i !== index)),
        [onValueChange, index],
    )

    return { specificInputRef, replaceFile, deleteFile }
}
