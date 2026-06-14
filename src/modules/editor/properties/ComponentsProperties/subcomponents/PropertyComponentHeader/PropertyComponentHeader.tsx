import { PropertyContainer } from '@/modules/editor/components/atoms'
import { BreadcrumbItem, Breadcrumbs } from '@heroui/react'
import { usePropertyComponentHeader } from './PropertyComponentHeader.hook'

export function PropertyComponentHeader() {
    const { hierarchy, componentName } = usePropertyComponentHeader()

    return (
        <PropertyContainer>
            {hierarchy?.length && (
                <Breadcrumbs
                    separator=">"
                    itemClasses={{
                        separator: 'leading-[110%] text-[12px]',
                        item: 'cursor-auto hover:opacity-1',
                    }}
                >
                    {hierarchy?.map((breadcrumb: string, index: number) => (
                        <BreadcrumbItem key={breadcrumb + index}>
                            {index + 1 == hierarchy?.length ? (
                                <span className="text-[#A1A1AA]">
                                    {breadcrumb}
                                </span>
                            ) : (
                                <span className="text-[#006FEE]">
                                    {breadcrumb}
                                </span>
                            )}
                        </BreadcrumbItem>
                    ))}
                </Breadcrumbs>
            )}
            <h2 className="font-medium text-[18px] leading-[110%]">
                Editar {componentName}
            </h2>
        </PropertyContainer>
    )
}
