'use client'

import { Puck } from '@measured/puck'
import { MenuTitle } from '@/modules/editor/components/atoms/MenuTitle'

export function ComponentsMenu() {
    return (
        <div className="menu-wrapper">
            <MenuTitle>Componentes</MenuTitle>
            <div className="scrollable-wrapper">
                <Puck.Components />
            </div>
        </div>
    )
}
