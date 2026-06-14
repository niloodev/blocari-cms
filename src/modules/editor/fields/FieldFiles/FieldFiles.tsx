'use client'

import { PropertyContainer } from '@/modules/editor/components/atoms'
import { FieldFilesProps } from './FieldFiles.types'

import { Button } from '@heroui/react'
import { Plus } from 'lucide-react'

import { FileRow } from './subcomponents'
import { useFieldFiles } from './FieldFiles.hook'

export function FieldFiles({
    label = 'Arquivos',
    files,
    onValueChange,
    allowedExtensions,
    limit = 9,
}: FieldFilesProps) {
    const { inputRef, addFile, handleOnClick } = useFieldFiles({
        onValueChange,
    })

    return (
        <PropertyContainer label={label}>
            <div className="flex flex-col gap-[4px] mt-[8px]">
                <input
                    ref={inputRef}
                    type="file"
                    accept={allowedExtensions}
                    className="hidden"
                    onChange={addFile}
                    onClick={handleOnClick}
                />
                {files.length < limit && (
                    <Button
                        className="rounded-[6px] min-w-[28px] w-[28px] h-[28px] bg-[#F4F4F5] text-[#A1A1AA]"
                        size="sm"
                        isIconOnly
                        onPress={() => inputRef.current?.click()}
                    >
                        <Plus width={16} height={16} />
                    </Button>
                )}
                {files.map((file: File, index: number) => (
                    <FileRow
                        file={file}
                        allowedExtensions={allowedExtensions}
                        index={index}
                        onValueChange={onValueChange}
                        key={file.name + index}
                    />
                ))}
            </div>
        </PropertyContainer>
    )
}
