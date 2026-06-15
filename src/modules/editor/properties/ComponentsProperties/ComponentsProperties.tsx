import { Puck } from '@measured/puck'
import { useComponentProperties } from './ComponentsProperties.hook'
import { PropertyComponentHeader } from './subcomponents'
import { ComponentsPropertiesLoading } from './ComponentsProperties.loading'

export function ComponentsProperties() {
    const { haveComponentSelected, isLoading } = useComponentProperties()

    if (isLoading) return <ComponentsPropertiesLoading />

    return (
        <div className="properties-wrapper">
            {haveComponentSelected && (
                <div className="flex flex-col h-full">
                    <PropertyComponentHeader />
                    <div className="scrollable-wrapper">
                        <Puck.Fields />
                    </div>
                </div>
            )}
        </div>
    )
}
