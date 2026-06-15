import { z } from 'zod'

export const imageSchema = z.object({
    _id: z.string().optional(),
    name: z.string().nonempty('Nome da imagem é obrigatório'),
    // src pode ser um data URL (base64) na entrada, ou um caminho servido
    // pelo próprio CMS (ex: /api/images/<id>) na saída.
    src: z.string().nonempty('Imagem é obrigatória'),
    alt: z.string().optional(),
    title: z.string().optional(),
})
