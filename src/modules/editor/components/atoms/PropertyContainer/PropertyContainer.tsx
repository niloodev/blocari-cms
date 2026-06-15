import { PropertyContainerProps } from './PropertyContainer.types'

export function PropertyContainer({ label, children }: PropertyContainerProps) {
    return (
        <div
            className="w-full p-[18px] border-y-[1px] border-solid border-content2"
            data-property-container
        >
            <div className="flex flex-col gap-[10px]">
                {label && (
                    <label className="text-foreground font-medium text-[14px] leading-[110%]">
                        {label}
                    </label>
                )}
                {children}
            </div>
        </div>
    )
}
