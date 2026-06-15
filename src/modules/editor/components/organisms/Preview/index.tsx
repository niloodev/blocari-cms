import dynamic from 'next/dynamic'
import { PreviewLoading } from './Preview.loading'

export const Preview = dynamic(
    () => import('./Preview').then(mod => mod.Preview),
    {
        loading: () => <PreviewLoading />,
        ssr: false,
    },
)
