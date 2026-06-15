'use client'

import { PropertyTitle } from '@/modules/editor/components/atoms'
import { FieldFiles, FieldText } from '@/modules/editor/fields'

export function TypographyProperties() {
    return (
        <div className="properties-wrapper">
            <PropertyTitle>Editar Fonte</PropertyTitle>
            <div className="scrollable-wrapper">
                <FieldText
                    label="Nome"
                    placeholder="Insira um nome..."
                    isRequired
                />
                <FieldFiles
                    allowedExtensions=".ttf,.otf,.woff,.woff2"
                    label="Arquivos"
                    files={[
                        new File([''], 'fonte.ttf', { type: 'font/ttf' }),
                        new File([''], 'fonte.woff', { type: 'font/woff' }),
                        new File([''], 'fonte.woff2', { type: 'font/woff2' }),
                    ]}
                />
            </div>
        </div>
    )
}
