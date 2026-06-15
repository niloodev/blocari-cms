import { imageSchema } from './images.schemas'
import { z } from 'zod'

export type IImage = z.infer<typeof imageSchema>

export type IImageResponse = IImage & { _id: string }

export type IImageData = { data: string; mimeType: string }

export interface IImageModels {
    getImages: () => Promise<IImageResponse[]>
    getImageById: (id: string) => Promise<IImageResponse>
    createImage: (image: IImage) => Promise<IImageResponse>
    updateImage: (image: Partial<IImage>) => Promise<IImageResponse>
    /** Bytes brutos da imagem (base64 + mimeType) para serem servidos via API. */
    getImageData: (id: string) => Promise<IImageData | null>
}
