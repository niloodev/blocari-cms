'use client'

import { Button, Link } from '@heroui/react'
import { Download, Trash, Upload } from 'lucide-react'

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
            />
            <span className="w-full py-[8px] px-[6px] text-[12px] leading-[100%] text-[#18181B]">
                {file.name}
            </span>
            <Link
                className="rounded-[6px] cursor-pointer min-w-[28px] w-[28px] h-[28px] justify-center items-center bg-[#F4F4F5] text-[#A1A1AA]"
                size="sm"
                isExternal
                download={file.name}
                href={URL.createObjectURL(file)}
            >
                <Download width={16} height={16} />
            </Link>
            <Button
                className="px-[none] rounded-[6px] min-w-[28px] max-w-[28px] h-[28px] bg-[#F4F4F5] text-[#A1A1AA]"
                size="sm"
                onPress={deleteFile}
                isIconOnly
            >
                <Trash width={16} height={16} />
            </Button>
            <Button
                className="px-[none] rounded-[6px] min-w-[28px] max-w-[28px] h-[28px] bg-[#F4F4F5] text-[#A1A1AA]"
                size="sm"
                onPress={() => specificInputRef.current?.click()}
                isIconOnly
            >
                <Upload width={16} height={16} />
            </Button>
        </div>
    )
}
