import { FlexProps } from './Flex.fields'
import { DropZone } from '@measured/puck'

export function Flex({ direction, justify, align, wrap, gap }: FlexProps) {
    return (
        <DropZone
            zone="flex-zone"
            style={{
                display: 'flex',
                flexDirection: direction,
                justifyContent: justify,
                alignItems: align,
                flexWrap: wrap,
                gap: gap,
            }}
        />
    )
}
