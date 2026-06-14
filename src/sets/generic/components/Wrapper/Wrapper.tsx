import { DropZone } from '@measured/puck'
import { WrapperProps } from './Wrapper.fields'
import { StyledWrapper } from './Wrapper.styles'

export function Wrapper({ maxWidth }: WrapperProps) {
    return (
        <StyledWrapper $maxWidth={maxWidth ?? 1200}>
            <DropZone zone="wrapper-zone" />
        </StyledWrapper>
    )
}
