import { IImageModels } from './images.types'
import { imageModels as StandaloneImageModels } from './standalone'
import { imageModels as ApiImageModels } from './api'
import { typeSwitcher } from '@/core/tools'

export const imageModels = typeSwitcher<IImageModels>({
    switch: {
        standalone: StandaloneImageModels,
        api: ApiImageModels,
    },
})

export const getImages = imageModels.getImages
export const createImage = imageModels.createImage
export const getImageById = imageModels.getImageById
export const updateImage = imageModels.updateImage
export const getImageData = imageModels.getImageData
