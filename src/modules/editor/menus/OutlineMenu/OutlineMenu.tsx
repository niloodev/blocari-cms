import { Puck } from '@measured/puck'
import { MenuTitle } from '@/modules/editor/components/atoms/MenuTitle'

export function OutlineMenu() {
    return (
        <div className="menu-wrapper">
            <div className="flex flex-col gap-2 max-h-full">
                <MenuTitle>Visão Geral</MenuTitle>
                <div className="scrollable-wrapper [&_*]:text-foreground [&_button>div:nth-child(2)>div:first-child]:!mt-0">
                    <Puck.Outline />
                </div>
            </div>
        </div>
    )
}
