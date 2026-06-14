'use client'

import { menus } from '@/modules/editor/editor.constants'
import { useEditor } from '@/modules/editor/store'
import { Button, Tooltip } from '@heroui/react'

export function MenuSelector() {
    const { selectedMenu, setSelectedMenu } = useEditor()

    return (
        <nav className="flex flex-col min-w-[56px] w-[56px] border-b-[1.5px] border-solid border-[#f4f4f5]">
            {menus?.map((menu, index) => (
                <div
                    key={index}
                    className={`border-[1.5px] border-solid border-[#f4f4f5] gap-[6px] flex flex-col py-[18px] items-center w-full ${index === menus.length - 1 ? 'flex-1' : ''}`}
                >
                    {menu?.map(item => (
                        <Tooltip
                            key={item.title}
                            content={item.title}
                            placement="right"
                            color="foreground"
                        >
                            <Button
                                className={`${item.title == selectedMenu.title ? 'text-[#006FEE]' : ''}`}
                                onPress={() => setSelectedMenu(item)}
                                isDisabled={item.disabled}
                                variant="light"
                                isIconOnly
                                size="sm"
                            >
                                {item.icon}
                            </Button>
                        </Tooltip>
                    ))}
                </div>
            ))}
        </nav>
    )
}
