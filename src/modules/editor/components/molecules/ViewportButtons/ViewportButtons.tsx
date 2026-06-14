'use client'

import { Button, Tooltip } from '@heroui/react'
import { viewports } from '@/modules/editor/editor.constants'
import { useViewportButtons } from './ViewportButtons.hook'

export function ViewportButtons() {
    const { currentViewport, defineViewport } = useViewportButtons()

    return (
        <div className="flex items-center">
            {viewports.map((viewport, index) => {
                const isSelected = currentViewport.width == viewport.width
                const isFirst = index == 0
                const isLast = index == viewports.length - 1

                return (
                    <Tooltip
                        key={index}
                        content={viewport?.label}
                        placement="bottom"
                        color="foreground"
                    >
                        <Button
                            onPress={() => defineViewport(viewport)}
                            className={`
                            bg-[#D4D4D866] text-[#000] min-w-[none] w-[62px] p-[none]
                            ${isFirst ? 'rounded-tr-none rounded-br-none' : ''}
                            ${isLast ? 'rounded-tl-none rounded-bl-none' : ''}
                            ${!isFirst && !isLast ? 'rounded-none' : ''}
                            ${isSelected ? 'bg-[#006FEE33] text-[#006FEE]' : ''}
                        `}
                        >
                            {viewport.icon && (
                                <div className="w-[20px] h-[20px]">
                                    {viewport.icon}
                                </div>
                            )}
                        </Button>
                    </Tooltip>
                )
            })}
        </div>
    )
}
