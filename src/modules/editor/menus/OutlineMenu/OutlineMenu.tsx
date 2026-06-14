import { Puck } from '@measured/puck'
import { MenuTitle } from '@/modules/editor/components/atoms'

export function OutlineMenu() {
    return (
        <div className="menu-wrapper">
            <div className="flex flex-col gap-2">
                <MenuTitle>Visão Geral</MenuTitle>
                <div className="scrollable-wrapper">
                    <Puck.Outline />
                </div>
            </div>
        </div>
    )
}
