import { getPages } from '@/core/models/pages'
import type { MetadataRoute } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

// Gerado sob demanda (depende do banco), não no build.
export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    let pages: Awaited<ReturnType<typeof getPages>> = []

    try {
        pages = await getPages()
    } catch {
        // Sem banco disponível, retorna um sitemap vazio em vez de quebrar.
        return []
    }

    return pages
        // Rotas dinâmicas (com segmentos como /<ID>) dependem de um adapter
        // concreto para serem expandidas; sem adapters registrados, ficam fora.
        .filter(page => !page.slug.includes('<'))
        .map(page => ({
            url: `${baseUrl}${page.slug}`,
            lastModified: new Date(),
        }))
}
