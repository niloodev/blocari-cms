import dynamic from 'next/dynamic'

export const PageStatus = dynamic(
    () => import('./PageStatus').then(mod => mod.PageStatus),
    {
        loading: () => <div className="flex-1" />,
        ssr: false,
    },
)
