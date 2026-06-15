'use client'

import { PropertyContainer } from '@/modules/editor/components/atoms'
import { FieldFilesProps } from './FieldFiles.types'

import { Button } from '@/shared/libs/heroui'
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
                    data-testid="input-file"
                />
                {files.length < limit && (
                    <Button
                        className="bg-content3 text-foreground"
                        size="sm"
                        isIconOnly
                        onPress={() => inputRef.current?.click()}
                        aria-label="Adicionar arquivo"
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
