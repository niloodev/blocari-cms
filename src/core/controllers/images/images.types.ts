import { IImage } from '@/core/models/images'
import { BaseError, BaseResponse } from '../controllers.types'
import { imageErrors } from './images.errors'

type ImageErrorsValues = (typeof imageErrors)[keyof typeof imageErrors]

export type IImageControllerResponse<T> =
    | BaseResponse<T>
    | BaseError<ImageErrorsValues>

export interface IImageController {
    getImages: () => Promise<IImageControllerResponse<IImage[]>>
    getImageById: (id: string) => Promise<IImageControllerResponse<IImage>>
    createImage: (image: IImage) => Promise<IImageControllerResponse<IImage>>
    updateImage: (image: IImage) => Promise<IImageControllerResponse<IImage>>
}
