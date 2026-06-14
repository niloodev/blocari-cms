'use client'

import {
    PropertyTitle,
    PropertyContainer,
} from '@/modules/editor/components/atoms'
import { DeleteButton } from '@/modules/editor/components/molecules'
import { FieldFiles, FieldText } from '@/modules/editor/fields'
import { useState } from 'react'

export function TypographyProperties() {
    const [typographyMocks, setTypographyMocks] = useState<File[]>([
        new File([''], 'fonte.ttf', { type: 'font/ttf' }),
        new File([''], 'fonte.woff', { type: 'font/woff' }),
        new File([''], 'fonte.woff2', { type: 'font/woff2' }),
    ])
    const [selectedTypographyMock, setSelectedTypographyMock] =
        useState('Poppins')

    return (
        <div className="properties-wrapper">
            <PropertyTitle>Editar Fonte</PropertyTitle>
            <div className="scrollable-wrapper">
                <FieldText
                    label="Nome"
                    value={selectedTypographyMock}
                    onValueChange={v => setSelectedTypographyMock(v)}
                    placeholder="Insira um nome..."
                    isRequired
                />
                <FieldFiles
                    allowedExtensions=".ttf,.otf,.woff,.woff2"
                    label="Arquivos"
                    files={typographyMocks}
                    onValueChange={setTypographyMocks}
                />
            </div>
            <PropertyContainer>
                <DeleteButton />
            </PropertyContainer>
        </div>
    )
}
