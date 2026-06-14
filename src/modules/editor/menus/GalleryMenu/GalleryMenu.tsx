'use client'

import { ImageButton, MenuTitle } from '@/modules/editor/components/atoms'
import imagePlaceholder from '@/../public/image_placeholder.png'
import { useState } from 'react'

export function GalleryMenu() {
    const [selected, setSelected] = useState<string>('Imagem 1')

    const imagesMock = [
        {
            name: 'Imagem 1',
            image: imagePlaceholder,
        },
        { name: 'Imagem de skarbsglorbs', image: imagePlaceholder },
        { name: 'Imagem de skarbsglorbss', image: imagePlaceholder },
        { name: 'Imagem de skarbsglorbsss', image: imagePlaceholder },
    ]

    return (
        <div className="menu-wrapper">
            <MenuTitle>Galeria</MenuTitle>
            <div className="scrollable-wrapper">
                <div className="flex flex-wrap justify-between pr-[2px] gap-[12px]">
                    {imagesMock.map(page => (
                        <ImageButton
                            key={page.name}
                            name={page.name}
                            image={page.image}
                            selected={selected == page.name}
                            onPress={() => setSelected(page.name)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
