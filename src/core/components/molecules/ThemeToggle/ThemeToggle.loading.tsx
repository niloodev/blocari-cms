import { Skeleton } from '@/shared/libs/heroui'

export function ThemeToggleLoading() {
    return (
        <Skeleton
            className="w-[70px] h-[40px] rounded-full"
            data-testid="theme-toggle-loading"
        />
    )
}
