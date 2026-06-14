import { PropertyContainerProps } from './PropertyContainer.types'

export function PropertyContainer({ label, children }: PropertyContainerProps) {
    return (
        <div className="w-full p-[18px] border-y-[1px] border-solid border-[#f4f4f5]">
            <div className="flex flex-col gap-[10px]">
                {label && (
                    <label className="text-[#52525B] font-medium text-[14px] leading-[110%]">
                        {label}
                    </label>
                )}
                {children}
            </div>
        </div>
    )
}
