import { z } from 'zod'
import { Data } from '@measured/puck'
import { adapters } from '@/adapters'

const normalSlugRegex =
    /^\/$|^\/[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*$/

// Schema base para páginas
const basePageSchema = z.object({
    _id: z.string().optional(),
    title: z.string().nonempty('Título da página é obrigatório'),
    description: z.string().optional(),
    canonical: z.string().optional(),
    opengraphImage: z.string().optional(),
    dynamicAdaptor: z.string().default(''),
    slug: z.string().nonempty('Slug da página é obrigatório'),
    content: z.custom<Data>(val => {
        if (typeof val !== 'object' || val === null) return false
        return true
    }),
})

/**
 * Valida páginas normais e dinâmicas. Rotas dinâmicas dependem de um adapter
 * concreto registrado em `@/adapters`; sem adapters, apenas rotas normais
 * passam na validação.
 */
export const pageSchema = basePageSchema.superRefine((data, ctx) => {
    // Rota normal
    if (!data.dynamicAdaptor) {
        if (!normalSlugRegex.test(data.slug)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['slug'],
                message:
                    'Slug da página deve começar com / e pode conter letras minúsculas, números e hífens. Exemplo: /, /minha-pagina ou /carros/listagem',
            })
        }
        return
    }

    // Rota dinâmica
    const adapter = adapters[data.dynamicAdaptor]
    if (!adapter) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['dynamicAdaptor'],
            message: `Adapter "${data.dynamicAdaptor}" não está registrado`,
        })
        return
    }

    const uniqueFields = adapter.availableMappedFields.filter(
        field => field.isUnique,
    )
    if (uniqueFields.length === 0) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['dynamicAdaptor'],
            message: `O adapter "${adapter.adapterName}" não possui campos únicos disponíveis`,
        })
        return
    }

    const dynamicSegments =
        data.slug
            .match(/<([A-Z-]+)>/g)
            ?.map((segment: string) => segment.replace(/[<>]/g, '')) || []

    if (dynamicSegments.length === 0) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['slug'],
            message: `Rota dinâmica deve conter pelo menos um segmento dinâmico, Exemplo: /products/<${uniqueFields[0].id}>`,
        })
        return
    }

    if (dynamicSegments.length > 1) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['slug'],
            message: `Rota dinâmica deve conter apenas um segmento dinâmico. Exemplo: /carros/<ID-CARRO>`,
        })
        return
    }

    const hasValidUniqueSegment = dynamicSegments.some((segment: string) =>
        uniqueFields.some(field => field.id === segment),
    )

    if (!hasValidUniqueSegment) {
        const uniqueFieldIds = uniqueFields
            .map(field => `<${field.id}>`)
            .join(', ')
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['slug'],
            message: `A rota dinâmica deve conter pelo menos um segmento que corresponda a um campo único do adaptador. Campos únicos disponíveis: ${uniqueFieldIds}`,
        })
        return
    }
})

// Schemas separados para validação no editor
export const titleSchema = z.string().nonempty('Título da página é obrigatório')
export const slugSchema = z.string().nonempty('Slug da página é obrigatório')
export const dynamicAdaptorSchema = z.string()
export const descriptionSchema = z.string().optional()
export const canonicalSchema = z.string().optional()
export const opengraphImageSchema = z.string().optional()
