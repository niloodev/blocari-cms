import { RenderPageClient } from './RenderPage.client'
import { RenderPageProps } from './RenderPage.types'

export function RenderPage({ page }: RenderPageProps) {
    return <RenderPageClient page={page} />
}
