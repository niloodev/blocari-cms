import { Tooltip } from '@/shared/libs/heroui'
import { ComponentItemProps } from './ComponentItem.types'
import { sets } from '@/sets'

export function ComponentItem({ name }: ComponentItemProps) {
    return (
        <Tooltip
            content={sets[name]?.label ?? name}
            closeDelay={0}
            color="foreground"
            placement="bottom"
        >
            <div className="h-[80px] min-w-[80px] max-w-[80px] w-full flex-1 rounded-lg border-[1.5px] text-foreground border-foreground flex flex-col items-center justify-between py-[15px] gap-[6px]">
                {sets[name]?.icon}
                <p className="text-[12px] font-[300] leading-[120%] font-poppins tracking-[.5px] text-center overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[85%]">
                    {sets[name]?.label ?? name}
                </p>
            </div>
        </Tooltip>
    )
}
