import { PropertyContainer } from '@/modules/editor/components/atoms/PropertyContainer'
import { BreadcrumbItem, Breadcrumbs } from '@/shared/libs/heroui'
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
                                <span className="text-primary">
                                    {breadcrumb}
                                </span>
                            ) : (
                                <span className="text-gray-400">
                                    {breadcrumb}
                                </span>
                            )}
                        </BreadcrumbItem>
                    ))}
                </Breadcrumbs>
            )}
            <h2 className="text-md">Editar {componentName}</h2>
        </PropertyContainer>
    )
}
