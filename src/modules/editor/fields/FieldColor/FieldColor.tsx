'use client'

import {
    Input,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/shared/libs/heroui'
import { PropertyContainer } from '@/modules/editor/components/atoms'
import { FieldColorProps } from './FieldColor.types'
import { HexColorPicker } from 'react-colorful'
import { fieldValidator } from '@/shared/tools'
import { z } from 'zod'

export function FieldColor({
    label = 'Cor',
    validator,
    value,
    onChange,
}: FieldColorProps) {
    const error =
        validator?.(value) ??
        fieldValidator(
            z
                .string()
                .regex(
                    /^#(([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})$/,
                    'Cor inválida',
                ),
        )?.(value)

    return (
        <PropertyContainer label={label}>
            <Popover placement="bottom">
                <div className="flex flex-row gap-1 cursor-pointer">
                    <PopoverTrigger>
                        <div
                            data-testid="color-picker-trigger"
                            style={{ backgroundColor: value }}
                            className="flex-1 min-w-10 h-full aspect-square rounded-full hover:opacity-70 transition-all duration-200"
                        />
                    </PopoverTrigger>
                    <Input
                        value={value}
                        size="md"
                        type="text"
                        isInvalid={error?.valid === false}
                        errorMessage={error?.message}
                        onValueChange={onChange}
                        className="cursor-pointer"
                    />
                </div>
                <PopoverContent>
                    <HexColorPicker
                        color={value}
                        onChange={onChange}
                        className="my-1"
                    />
                </PopoverContent>
            </Popover>
        </PropertyContainer>
    )
}
