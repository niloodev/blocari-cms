'use client'

import { usePageStatus } from './PageStatus.hook'
import { PageStatusLoading } from './PageStatus.loading'

export function PageStatus() {
    const { isDraft, status, pageName, isLoading } = usePageStatus()

    if (isLoading) return <PageStatusLoading />

    return (
        <div className="flex flex-col gap-1 items-center justify-center flex-1 h-full">
            <h1 className="text-xs leading-[110%]">{pageName}</h1>
            {status[isDraft ? 'draft' : 'published']}
        </div>
    )
}
