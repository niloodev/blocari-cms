'use client'

import { Button } from '@/shared/libs/heroui'
import { MenuTitle } from '@/modules/editor/components/atoms/MenuTitle'

export function TypographyMenu() {
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
                            className="bg-content1 text-foreground justify-start"
                        >
                            {typography}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    )
}
