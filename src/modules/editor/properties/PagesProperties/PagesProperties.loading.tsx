import { PropertyTitle } from '@/modules/editor/components/atoms'
import { Skeleton } from '@/shared/libs/heroui'

export function PagesPropertiesLoading() {
    return (
        <div
            className="properties-wrapper"
            data-testid="pages-properties-loading"
        >
            <PropertyTitle>Editar Página</PropertyTitle>
            <Skeleton className="flex-1 w-full" />
        </div>
    )
}
