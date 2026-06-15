import { Spinner } from '@/shared/libs/heroui'

export function PreviewLoading() {
    return (
        <div
            className="flex-1 p-[2px] overflow-hidden max-h-full bg-content2 flex items-center justify-center absolute top-0 left-0 w-full h-full z-10"
            data-testid="preview-loading"
        >
            <Spinner variant="wave" />
        </div>
    )
}
