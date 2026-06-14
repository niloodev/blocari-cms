import { MenuTitleProps } from './MenuTitle.types'

export function MenuTitle({ children }: MenuTitleProps) {
    return (
        <h2 className="font-medium text-[16px] leading-[110%] text-[#000]">
            {children}
        </h2>
    )
}
