'use client'

import {
    ImageButton,
    MenuTitle,
    AddButton,
} from '@/modules/editor/components/atoms'
import { usePagesMenu } from './PagesMenu.hook'
import pageImagePlaceholder from '@/../public/page_placeholder.png'
import { PagesMenuLoading } from './PagesMenu.loading'
import { motion } from 'motion/react'

export function PagesMenu() {
    const { pages, pageId, handleSelectPage, isLoading } = usePagesMenu()

    if (isLoading) return <PagesMenuLoading />

    return (
        <div className="menu-wrapper">
            <MenuTitle>Páginas</MenuTitle>
            <div className="scrollable-wrapper">
                <div className="flex flex-wrap justify-between pr-[2px] gap-[12px]">
                    <AddButton
                        className={`mb-[18px] ${!pageId ? 'border-[#006FEE] border-solid border-[2px]' : ''}`}
                        onPress={() => handleSelectPage('')}
                    />
                    {pages.map(page => (
                        <motion.div
                            key={page.slug}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <ImageButton
                                name={page.title}
                                image={pageImagePlaceholder}
                                selected={pageId === page._id}
                                onPress={() => handleSelectPage(page._id ?? '')}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}
