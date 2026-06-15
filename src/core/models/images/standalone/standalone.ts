import { connectDB } from '@/core/services/mongodb'
import { IImageModels } from '../images.types'
import { imagesModel } from './standalone.schemas'
import { imageErrors } from '@/core/controllers/images/images.errors'
import { extractMimeTypeFromBase64, removeDataUrlPrefix } from '@/core/tools'

/** Caminho público servido pela rota /api/images/[id]. */
const srcFor = (id: string) => `/api/images/${id}`

const isBase64Image = (src?: string) =>
    typeof src === 'string' && src.startsWith('data:image/')

const getImages: IImageModels['getImages'] = async () => {
    await connectDB()
    const images = await imagesModel.find()
    return images.map(image => ({
        name: image.name,
        src: srcFor(image._id.toString()),
        alt: image.alt,
        title: image.title,
        _id: image._id.toString(),
    }))
}

const createImage: IImageModels['createImage'] = async newImage => {
    await connectDB()
    try {
        const mimeType =
            extractMimeTypeFromBase64(newImage.src) || 'image/jpeg'
        const data = removeDataUrlPrefix(newImage.src)

        const createdImage = await imagesModel.create({
            name: newImage.name,
            data,
            mimeType,
            alt: newImage.alt,
            title: newImage.title,
        })

        return {
            name: createdImage.name,
            src: srcFor(createdImage._id.toString()),
            alt: createdImage.alt,
            title: createdImage.title,
            _id: createdImage._id.toString(),
        }
    } catch {
        throw new Error(imageErrors.imageNotCreated)
    }
}

const getImageById: IImageModels['getImageById'] = async id => {
    await connectDB()
    const image = await imagesModel.findById(id)
    return {
        name: image?.name,
        src: image ? srcFor(image._id.toString()) : '',
        alt: image?.alt,
        title: image?.title,
        _id: image?._id.toString(),
    }
}

const updateImage: IImageModels['updateImage'] = async image => {
    await connectDB()

    const existingImage = await imagesModel.findById(image._id)
    if (!existingImage) throw new Error(imageErrors.imageNotFound)

    if (image.name !== undefined) existingImage.name = image.name
    if (image.alt !== undefined) existingImage.alt = image.alt
    if (image.title !== undefined) existingImage.title = image.title

    // Só re-grava o binário se um novo base64 foi enviado.
    if (isBase64Image(image.src)) {
        existingImage.mimeType =
            extractMimeTypeFromBase64(image.src as string) || 'image/jpeg'
        existingImage.data = removeDataUrlPrefix(image.src as string)
    }

    try {
        const updatedImage = await existingImage.save()
        return {
            name: updatedImage.name,
            src: srcFor(updatedImage._id.toString()),
            alt: updatedImage.alt,
            title: updatedImage.title,
            _id: updatedImage._id.toString(),
        }
    } catch {
        throw new Error(imageErrors.imageNotUpdated)
    }
}

const getImageData: IImageModels['getImageData'] = async id => {
    await connectDB()
    const image = await imagesModel.findById(id)
    if (!image?.data || !image?.mimeType) return null
    return { data: image.data, mimeType: image.mimeType }
}

export const imageModels: IImageModels = {
    getImages,
    createImage,
    getImageById,
    updateImage,
    getImageData,
}
