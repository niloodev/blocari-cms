import { PropertyContainer } from '../PropertyContainer'
import { PropertyTitleProps } from './PropertyTitle.types'

export function PropertyTitle({ children }: PropertyTitleProps) {
    return (
        <PropertyContainer>
            <h2 className="font-medium text-[18px] leading-[110%]">
                {children}
            </h2>
        </PropertyContainer>
    )
}
