import { TypographyProps } from './Typography.fields'
import { StyledTypography } from './Typography.styles'

export function Typography({
    text,
    size,
    weight,
    tag,
    align,
    padding,
}: TypographyProps) {
    return (
        <StyledTypography
            $size={size}
            $weight={weight}
            $align={align}
            $padding={padding}
            as={tag}
        >
            {text}
        </StyledTypography>
    )
}
