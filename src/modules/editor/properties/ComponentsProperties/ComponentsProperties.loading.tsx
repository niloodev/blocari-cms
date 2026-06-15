import { Skeleton } from '@/shared/libs/heroui'

export function ComponentsPropertiesLoading() {
    return (
        <Skeleton
            className="w-full h-full flex-1"
            data-testid="components-properties-loading"
        />
    )
}
