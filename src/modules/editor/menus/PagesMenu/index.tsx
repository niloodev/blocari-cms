import dynamic from 'next/dynamic'
import { PagesMenuLoading } from './PagesMenu.loading'
import { withErrorBoundary } from 'react-error-boundary'
import { PagesMenuError } from './PagesMenu.error'

export const PagesMenu = withErrorBoundary(
    dynamic(() => import('./PagesMenu').then(mod => mod.PagesMenu), {
        ssr: false,
        loading: () => <PagesMenuLoading />,
    }),
    {
        fallback: <PagesMenuError />,
    },
)
