import styled from 'styled-components'

export const StyledTypography = styled.p<{
    $size: string
    $weight: string
    $align: string
    $padding: string
}>`
    display: block;
    font-size: ${({ $size }) => $size};
    font-weight: ${({ $weight }) => $weight};
    text-align: ${({ $align }) => $align};
    padding: ${({ $padding }) => $padding} 0;
    font-family: sans-serif;
    color: #000;
    line-height: 1.2;
    margin: 0;
`
