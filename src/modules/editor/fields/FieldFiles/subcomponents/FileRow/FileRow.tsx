'use client'

import { Button, Tooltip } from '@/shared/libs/heroui'
import { Trash, Upload } from 'lucide-react'

import { FileRowProps } from './FileRow.types'
import { useFileRow } from './FileRow.hook'

export function FileRow({
    file,
    index,
    allowedExtensions,
    onValueChange,
}: FileRowProps) {
    const { specificInputRef, replaceFile, deleteFile } = useFileRow({
        index,
        onValueChange,
    })

    return (
        <div className="flex gap-[4px]">
            <input
                ref={specificInputRef}
                type="file"
                accept={allowedExtensions}
                className="hidden"
                onChange={replaceFile}
                data-testid="replace-file-input"
            />
            <span className="w-full py-[8px] px-[6px] text-[12px] leading-[100%] text-foreground">
                {file.name}
            </span>
            <Tooltip content="Remover arquivo">
                <Button
                    className="px-[none] rounded-[6px] min-w-[28px] max-w-[28px] h-[28px] bg-content3 text-foreground"
                    size="sm"
                    onPress={deleteFile}
                    isIconOnly
                    aria-label="Remover arquivo"
                >
                    <Trash width={16} height={16} />
                </Button>
            </Tooltip>
            <Tooltip content="Substituir arquivo">
                <Button
                    className="px-[none] rounded-[6px] min-w-[28px] max-w-[28px] h-[28px] bg-content3 text-foreground"
                    size="sm"
                    onPress={() => specificInputRef.current?.click()}
                    isIconOnly
                    aria-label="Substituir arquivo"
                >
                    <Upload width={16} height={16} />
                </Button>
            </Tooltip>
        </div>
    )
}
