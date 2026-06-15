import { Skeleton } from '@/shared/libs/heroui'

export function PageStatusLoading() {
    return (
        <div
            className="flex-1 flex items-center justify-center"
            data-testid="page-status-loading"
        >
            <Skeleton className="w-[80px] h-[40px] rounded-md" />
        </div>
    )
}
