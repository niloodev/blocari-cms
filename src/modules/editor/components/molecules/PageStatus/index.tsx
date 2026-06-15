'use client'

import dynamic from 'next/dynamic'
import { PageStatusLoading } from './PageStatus.loading'

export const PageStatus = dynamic(
    () => import('./PageStatus').then(mod => mod.PageStatus),
    {
        loading: () => <PageStatusLoading />,
        ssr: false,
    },
)
