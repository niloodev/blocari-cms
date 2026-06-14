import dynamic from 'next/dynamic'

export const Preview = dynamic(
    () => import('./Preview').then(mod => mod.Preview),
    {
        loading: () => <div className="w-full h-full flex-1"></div>,
        ssr: false,
    },
)
