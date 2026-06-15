'use client'

import {
    ImageButton,
    MenuTitle,
    AddButton,
} from '@/modules/editor/components/atoms'
import { usePagesMenu } from './PagesMenu.hook'
import { motion } from 'motion/react'
import { Input, Spinner } from '@/shared/libs/heroui'

export function PagesMenu() {
    const { pages, pageId, handleSelectPage, isLoading, search, setSearch } =
        usePagesMenu()

    return (
        <div className="menu-wrapper">
            <MenuTitle>
                Páginas
                {isLoading && (
                    <Spinner
                        data-testid="pages-menu-loading-spinner"
                        size="sm"
                        variant="gradient"
                    />
                )}
                <Input
                    type="text"
                    size="sm"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Buscar..."
                />
            </MenuTitle>
            <div className="scrollable-wrapper">
                <div className="flex flex-wrap justify-between pr-[2px] gap-[12px]">
                    <AddButton
                        className={`mb-[18px] ${!pageId ? 'border-primary border-solid border-[2px]' : ''}`}
                        onPress={() => handleSelectPage()}
                        isDisabled={!pageId}
                        aria-label="Adicionar página"
                    />
                    {pages?.map(page => (
                        <motion.div
                            key={page._id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <ImageButton
                                name={page.title}
                                image={{
                                    src:
                                        page.opengraphImage ||
                                        `https://placehold.co/600x400/313131/7a7a7a?text=${page.title.replace(/\s+/g, '+')}&font=poppins`,
                                    width: 150,
                                    height: 150,
                                }}
                                selected={pageId === page._id}
                                onPress={() => handleSelectPage(page._id)}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}
