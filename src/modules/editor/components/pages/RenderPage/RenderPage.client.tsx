'use client'

import { Render } from '@measured/puck'
import { RenderPageProps } from './RenderPage.types'
import { config } from '@/modules/editor/editor.config'

export function RenderPageClient({ page }: RenderPageProps) {
    return <Render config={config} data={page.content} />
}
