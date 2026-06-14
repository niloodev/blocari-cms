import styled from 'styled-components'

export const StyledWrapper = styled.div<{ $maxWidth: number }>`
    max-width: ${({ $maxWidth }) => $maxWidth}px;
    margin: 0 auto;
    width: 90%;
`
