'use client'

import {
    PropertyContainer,
    PropertyTitle,
} from '@/modules/editor/components/atoms'
import { DeleteButton } from '@/modules/editor/components/molecules'
import { FieldFiles, FieldText } from '@/modules/editor/fields'
import { useState } from 'react'
import Image from 'next/image'

import imagePlaceholder from '@/../public/image_placeholder.png'

export function GalleryProperties() {
    const [selectedImageMock, setSelectedImageMock] = useState({
        name: 'Imagem 1',
        file: imagePlaceholder,
    })

    const [imageFileMock, setImageFileMock] = useState<File[]>([
        new File([''], 'image_placeholder.png', { type: 'image/png' }),
    ])

    return (
        <div className="properties-wrapper">
            <PropertyTitle>Editar Imagem</PropertyTitle>
            <PropertyContainer>
                <Image
                    src={selectedImageMock.file}
                    alt={selectedImageMock.name}
                />
            </PropertyContainer>
            <div className="scrollable-wrapper">
                <FieldText
                    label="Nome"
                    value={selectedImageMock.name}
                    onValueChange={v =>
                        setSelectedImageMock({ ...selectedImageMock, name: v })
                    }
                    placeholder="Insira um nome..."
                    isRequired
                />
                <FieldFiles
                    label="Arquivo"
                    files={imageFileMock}
                    limit={1}
                    allowedExtensions={'.png,.jpg,.jpeg,.webp,.avif,.gif'}
                    onValueChange={setImageFileMock}
                />
            </div>
            <PropertyContainer>
                <DeleteButton />
            </PropertyContainer>
        </div>
    )
}
