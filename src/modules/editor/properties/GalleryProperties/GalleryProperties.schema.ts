import { z } from 'zod'

export const galleryFormSchema = z.object({
    name: z.string().nonempty('Nome da imagem é obrigatório'),
    // src pode ser um data URL (base64, no upload) ou um caminho servido pelo
    // próprio CMS (ex: /api/images/<id>, na edição) — por isso não usamos .url().
    src: z.string().nonempty('Imagem é obrigatória'),
    alt: z.string().optional(),
    title: z.string().optional(),
})

export type GalleryFormData = z.infer<typeof galleryFormSchema>
