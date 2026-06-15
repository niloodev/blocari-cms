'use client'

import {
    PropertyContainer,
    PropertyTitle,
} from '@/modules/editor/components/atoms'
import { DeletePageButton } from './subcomponents'
import { Puck } from '@measured/puck'
import { useEditor } from '@/modules/editor/store'
import { PagesPropertiesLoading } from './PagesProperties.loading'

export function PagesProperties() {
    const { isLoading } = useEditor()

    if (isLoading) return <PagesPropertiesLoading />

    return (
        <div className="properties-wrapper">
            <PropertyTitle>Editar Página</PropertyTitle>
            <div className="scrollable-wrapper">
                <Puck.Fields />
            </div>
            <PropertyContainer>
                <DeletePageButton />
            </PropertyContainer>
        </div>
    )
}
