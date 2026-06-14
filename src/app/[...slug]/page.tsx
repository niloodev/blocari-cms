import { getPageBySlug } from '@/core/controllers/pages'
import { notFound } from 'next/navigation'
import { RenderPage } from '@/modules/editor/components/pages'

interface PageProps {
    params: Promise<{
        slug: string[]
    }>
}

export default async function Page({ params }: PageProps) {
    const { slug } = await params
    const data = await getPageBySlug(`/${slug.join('/')}`)
    if ('error' in data || !data?.payload?._id) notFound()

    return <RenderPage page={data.payload} />
}
