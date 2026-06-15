import { getPages, getPageBySlug } from '@/core/controllers/pages'
import {
    extractDynamicParams,
    processValueRecursively,
} from './dynamicRoute.utils'
import { VerifySlugResponse } from './dynamicRoute.types'
import { adapters } from '@/adapters'
import { Data } from '@measured/puck'

/**
 * Verifica se uma URL corresponde a uma rota dinâmica ou estática
 *
 * Prioridade: 1. Rotas dinâmicas, 2. Rotas estáticas, 3. 404
 *
 * @param requestedSlug - URL a ser verificada (ex: "/produtos/123")
 * @returns Objeto com página encontrada e parâmetros dinâmicos, ou null se não encontrar
 *
 * @example
 * verifySlug("/produtos/123")
 * // Retorna: { page: {...}, dynamicParams: { "ID-PRODUTO": "123" }, dynamicAdaptor: "meuAdapter" }
 */
export const verifySlug = async (
    requestedSlug: string,
): Promise<VerifySlugResponse | null> => {
    const dynamicPagesResponse = await getPages(true)
    if (dynamicPagesResponse.status === 'error') {
        return null
    }

    const dynamicPages = dynamicPagesResponse.payload

    for (const dynamicPage of dynamicPages) {
        const dynamicParams = extractDynamicParams(
            requestedSlug,
            dynamicPage.slug,
        )

        if (dynamicParams) {
            return {
                page: dynamicPage,
                dynamicParams,
                dynamicAdaptor:
                    dynamicPage.dynamicAdaptor as keyof typeof adapters,
            }
        }
    }

    const staticPageResponse = await getPageBySlug(requestedSlug)
    if (
        staticPageResponse.status === 'success' &&
        staticPageResponse.payload?._id
    ) {
        return {
            page: staticPageResponse.payload,
            dynamicParams: null,
            dynamicAdaptor: '' as keyof typeof adapters,
        }
    }

    return null
}

/**
 * Converte conteúdo estático do Puck em conteúdo dinâmico com dados reais
 *
 * Processa recursivamente todo o conteúdo, substituindo placeholders como
 * <CAMPO> ou <CAMPO:FORMATO> pelos valores reais do adapter
 *
 * @param content - Conteúdo estático do Puck (Data)
 * @param dynamicParams - Parâmetros extraídos da URL (ex: { "ID-PRODUTO": "123" })
 * @param adapterKey - Chave do adapter a ser usado
 * @returns Conteúdo processado com valores reais
 *
 * @example
 * convertStaticPayloadToDynamic(
 *   { title: "Produto: <NOME-PRODUTO>", price: "<PRECO:currency>" },
 *   { "ID-PRODUTO": "123" },
 *   "meuAdapter"
 * )
 * // Retorna: { title: "Produto: Exemplo", price: "R$ 150.000,00" }
 */
export const convertStaticPayloadToDynamic = async (
    content: Data,
    dynamicParams: Record<string, string>,
    adapterKey: keyof typeof adapters,
): Promise<Data> => {
    // Busca o adapter correspondente
    const adapter = adapters[adapterKey]
    if (!adapter)
        throw new Error(`Adaptador ${String(adapterKey)} não encontrado`)

    // Busca o campo único do adapter (usado para identificar o elemento)
    const uniqueField = adapter.availableMappedFields.find(
        field => field.isUnique,
    )?.id
    if (!uniqueField)
        throw new Error(
            `Adaptador ${String(adapterKey)} não possui campo único`,
        )

    // Extrai o ID do elemento a partir dos parâmetros dinâmicos
    const mappedId = dynamicParams[uniqueField]
    if (!mappedId)
        throw new Error(`Parâmetro dinâmico ${uniqueField} não encontrado`)

    // Busca o elemento específico no adapter
    const mappedElement = await adapter.getMappedElementByMappedId(mappedId)
    if (!mappedElement)
        throw new Error(
            `Elemento com ID ${mappedId} não encontrado no adaptador ${String(adapterKey)}`,
        )

    // Extrai os nomes dos campos disponíveis no adapter
    const availableFields = adapter.availableMappedFields.map(field => field.id)

    // Processa recursivamente o conteúdo, substituindo placeholders por valores reais
    return processValueRecursively(content, mappedElement, availableFields)
}
