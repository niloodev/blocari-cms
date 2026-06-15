import { MenuTitleProps } from './MenuTitle.types'

export function MenuTitle({ children }: MenuTitleProps) {
    return <h2 className="text-md mb-1 flex items-center gap-3">{children}</h2>
}
