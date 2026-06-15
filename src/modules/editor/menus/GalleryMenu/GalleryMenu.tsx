'use client'

import {
    ImageButton,
    MenuTitle,
    AddButton,
} from '@/modules/editor/components/atoms'
import { useGalleryMenu } from './GalleryMenu.hook'
import { motion } from 'motion/react'
import { Spinner } from '@/shared/libs/heroui'

export function GalleryMenu() {
    const { images, imageId, handleSelectImage, isLoading } = useGalleryMenu()

    return (
        <div className="menu-wrapper">
            <MenuTitle>
                Galeria
                {isLoading && (
                    <Spinner
                        data-testid="gallery-menu-loading-spinner"
                        size="sm"
                        variant="gradient"
                    />
                )}
            </MenuTitle>
            <div className="scrollable-wrapper">
                <div className="flex flex-wrap justify-between pr-[2px] gap-[12px]">
                    <AddButton
                        className={`mb-[18px] ${!imageId ? 'border-primary border-solid border-[2px]' : ''}`}
                        onPress={() => handleSelectImage()}
                        isDisabled={!imageId}
                        aria-label="Adicionar imagem"
                    />
                    {images?.map(image => (
                        <motion.div
                            key={image._id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <ImageButton
                                name={image.name}
                                image={{
                                    src: image.src,
                                    width: 150,
                                    height: 150,
                                }}
                                selected={imageId === image._id}
                                onPress={() => handleSelectImage(image._id)}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}
