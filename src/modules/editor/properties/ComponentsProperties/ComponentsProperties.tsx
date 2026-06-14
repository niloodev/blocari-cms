import { useComponentProperties } from './ComponentsProperties.hook'
import { ComponentOverview } from './subcomponents'

export function ComponentsProperties() {
    const { haveComponentSelected } = useComponentProperties()

    return (
        <div className="properties-wrapper">
            {haveComponentSelected && <ComponentOverview />}
        </div>
    )
}
