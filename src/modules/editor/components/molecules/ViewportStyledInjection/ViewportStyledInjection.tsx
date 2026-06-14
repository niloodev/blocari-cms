import { StyleSheetManager } from 'styled-components'
import { ViewportStyledInjectionProps } from './ViewportStyledInjection.types'

export function ViewportStyledInjection({
    iframe,
    target,
}: ViewportStyledInjectionProps) {
    return <StyleSheetManager target={target}>{iframe}</StyleSheetManager>
}
