'use client'

import { Button } from '@heroui/react'
import { useState } from 'react'
import { MenuTitle } from '@/modules/editor/components/atoms'

export function TypographyMenu() {
    const [selected, setSelected] = useState<string>('Poppins')

    const typographyMock = ['Poppins', 'Times New Roman', 'Arial', 'Gothic']

    return (
        <div className="menu-wrapper">
            <MenuTitle>Tipografia</MenuTitle>
            <div className="scrollable-wrapper">
                <div className="flex flex-wrap flex-col justify-between pr-[2px] gap-[4px]">
                    {typographyMock.map(typography => (
                        <Button
                            key={typography}
                            size="sm"
                            variant="flat"
                            className={`${typography == selected ? 'bg-[#006FEE33]' : 'bg-white'} text-[#000] text-[12px] leading-[120%] justify-start`}
                            onPress={() => setSelected(typography)}
                        >
                            {typography}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    )
}
