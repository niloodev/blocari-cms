import { z } from 'zod'
import { Data } from '@measured/puck'

export const pageSchema = z.object({
    _id: z.string().optional(),
    title: z.string().nonempty('Título da página é obrigatório'),
    slug: z
        .string()
        .nonempty('Slug da página é obrigatório')
        .regex(
            /^\/(?:[a-z0-9]+(?:-[a-z0-9]+)*)?$/,
            'Slug da página deve começar com / e pode conter letras minúsculas, números e hífens. Exemplo: /minha-pagina',
        ),
    content: z.custom<Data>(val => {
        if (typeof val !== 'object' || val === null) return false
        return true
    }),
})
