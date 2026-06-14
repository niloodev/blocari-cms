import { ComponentItemProps } from './ComponentItem.types'
import { sets } from '@/sets'

export function ComponentItem({ name }: ComponentItemProps) {
    return (
        <div className="h-[80px] min-w-[80px] w-full flex-1 rounded-lg border border-[#E4E4E7] border-[1.5px] flex flex-col items-center justify-center gap-[6px]">
            {sets[name]?.icon}
            <p className="text-[12px] font-[300] text-[#000] leading-[120%] font-poppins tracking-[.5px]">
                {sets[name]?.label ?? name}
            </p>
        </div>
    )
}
