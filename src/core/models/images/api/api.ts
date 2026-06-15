import { IImageModels } from '../images.types'

const getImages: IImageModels['getImages'] = async () => {
    console.log('API Images Fetched')
    return []
}

const createImage: IImageModels['createImage'] = async () => {
    console.log('API Image Created')
    return {
        name: 'teste',
        src: 'https://example.com/teste.jpg',
        _id: '123',
    }
}

const getImageById: IImageModels['getImageById'] = async () => {
    console.log('API Image Fetched')
    return {
        name: 'teste',
        src: 'https://example.com/teste.jpg',
        _id: '123',
    }
}

const updateImage: IImageModels['updateImage'] = async () => {
    console.log('API Image Updated')
    return {
        name: 'teste',
        src: 'https://example.com/teste.jpg',
        _id: '123',
    }
}

const getImageData: IImageModels['getImageData'] = async () => {
    console.log('API Image Data Fetched')
    return null
}

export const imageModels: IImageModels = {
    getImages,
    createImage,
    getImageById,
    updateImage,
    getImageData,
}
