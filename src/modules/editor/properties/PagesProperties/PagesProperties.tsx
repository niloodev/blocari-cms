'use client'

import {
    PropertyContainer,
    PropertyTitle,
} from '@/modules/editor/components/atoms'
import { DeleteButton } from '@/modules/editor/components/molecules'
import { Puck } from '@measured/puck'

export function PagesProperties() {
    return (
        <div className="properties-wrapper">
            <PropertyTitle>Editar Página</PropertyTitle>
            <div className="scrollable-wrapper">
                <Puck.Fields />
            </div>
            <PropertyContainer>
                <DeleteButton />
            </PropertyContainer>
        </div>
    )
}
