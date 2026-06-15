import dynamic from 'next/dynamic'
import { GalleryMenuLoading } from './GalleryMenu.loading'
import { withErrorBoundary } from 'react-error-boundary'
import { GalleryMenuError } from './GalleryMenu.error'
import React from 'react'

export const GalleryMenu = withErrorBoundary(
    dynamic(() => import('./GalleryMenu').then(mod => mod.GalleryMenu), {
        ssr: false,
        loading: () => <GalleryMenuLoading />,
    }),
    {
        fallback: <GalleryMenuError />,
    },
)
