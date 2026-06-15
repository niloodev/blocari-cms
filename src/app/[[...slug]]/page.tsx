import { notFound } from 'next/navigation'
import { RenderPage } from '@/modules/editor/components/pages'
import { convertStaticPayloadToDynamic, verifySlug } from '@/core/tools'
import { Data } from '@measured/puck'
import { IPage } from '@/core/models/pages'

export const revalidate = 72000

interface PageProps {
    params: Promise<{
        slug: string[]
    }>
}

export async function generateStaticParams() {
    return []
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params
    const requestedSlug = `/${slug?.join('/') ?? ''}`

    const result = await verifySlug(requestedSlug)
    if (!result) notFound()

    let processedContent: Data = result.page.content
    if (result.dynamicAdaptor) {
        try {
            processedContent = await convertStaticPayloadToDynamic(
                result.page.content,
                result.dynamicParams ?? {},
                result.dynamicAdaptor,
            )
        } catch {
            notFound()
        }
    }

    const rootProps = processedContent?.root?.props as IPage

    return {
        title: rootProps?.title ?? '',
        description: rootProps?.description ?? '',
        openGraph: {
            images: rootProps?.opengraphImage ?? '',
        },
        canonical: rootProps?.canonical ?? '',
    }
}

export default async function Page({ params }: PageProps) {
    const { slug } = await params
    const requestedSlug = `/${slug?.join('/') ?? ''}`

    const result = await verifySlug(requestedSlug)
    if (!result) notFound()

    let processedContent: Data = result.page.content

    if (result.dynamicAdaptor) {
        try {
            processedContent = await convertStaticPayloadToDynamic(
                result.page.content,
                result.dynamicParams ?? {},
                result.dynamicAdaptor,
            )
        } catch {
            notFound()
        }
    }

    return (
        <RenderPage
            page={{
                ...result.page,
                content: processedContent,
            }}
        />
    )
}
