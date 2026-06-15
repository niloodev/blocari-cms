import { PropertyContainer } from '../PropertyContainer'
import { PropertyTitleProps } from './PropertyTitle.types'

export function PropertyTitle({ children }: PropertyTitleProps) {
    return (
        <PropertyContainer>
            <h2 className="text-md">{children}</h2>
        </PropertyContainer>
    )
}
