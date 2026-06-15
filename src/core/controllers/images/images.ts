'use server'

import { imageSchema } from '@/core/models/images/images.schemas'
import { IImageController } from './images.types'
import {
    getImages as getImagesModel,
    createImage as createImageModel,
    getImageById as getImageByIdModel,
    updateImage as updateImageModel,
} from '@/core/models/images'
import { imageErrors } from './images.errors'

export const getImages: IImageController['getImages'] = async () => {
    const images = await getImagesModel()

    return {
        status: 'success',
        message: 'Imagens carregadas com sucesso',
        payload: images,
    }
}

export const getImageById: IImageController['getImageById'] = async id => {
    if (!id) return { status: 'error', error: imageErrors.idIsRequired }

    const image = await getImageByIdModel(id)
    return {
        status: 'success',
        message: 'Imagem carregada com sucesso',
        payload: image,
    }
}

export const createImage: IImageController['createImage'] = async image => {
    if (!imageSchema.safeParse(image).success)
        return { status: 'error', error: imageErrors.imageNotValid }

    // O binário (base64) é persistido no MongoDB pelo model; o src público
    // é derivado do _id e servido pela rota /api/images/[id].
    const newImage = await createImageModel(image)
    return {
        status: 'success',
        message: 'Imagem criada com sucesso',
        payload: newImage,
    }
}

export const updateImage: IImageController['updateImage'] = async image => {
    if (!image._id) return { status: 'error', error: imageErrors.idIsRequired }
    if (!imageSchema.safeParse(image).success)
        return { status: 'error', error: imageErrors.imageNotValid }

    const updatedImage = await updateImageModel(image)
    return {
        status: 'success',
        message: 'Imagem atualizada com sucesso',
        payload: updatedImage,
    }
}
