import { connectDB } from '@/core/services/mongodb'
import { IPageModels } from '../pages.types'
import { pagesModel } from './standalone.schemas'
import { mongo } from 'mongoose'
import { pageErrors } from '@/core/controllers/pages/pages.errors'

const getPages: IPageModels['getPages'] = async (
    isDynamic?: boolean,
    title?: string,
) => {
    await connectDB()

    const query: Record<string, unknown> = {}

    if (isDynamic !== undefined) {
        if (isDynamic) query.dynamicAdaptor = { $ne: '' }
        else query.dynamicAdaptor = ''
    }

    if (title) {
        query.$or = [
            { title: { $regex: title, $options: 'i' } },
            { slug: { $regex: title, $options: 'i' } },
        ]
    }

    const pages = await pagesModel.find(query)
    return pages.map(page => ({
        title: page.title,
        slug: page.slug,
        content: page.content,
        dynamicAdaptor: page.dynamicAdaptor,
        _id: page._id.toString(),
        description: page.description,
        canonical: page.canonical,
        opengraphImage: page.opengraphImage,
    }))
}

const createPage: IPageModels['createPage'] = async newPage => {
    await connectDB()
    try {
        const createdPage = await pagesModel.create(newPage)
        return {
            title: createdPage.title,
            slug: createdPage.slug,
            content: createdPage.content,
            _id: createdPage._id.toString(),
            dynamicAdaptor: createdPage.dynamicAdaptor,
            description: createdPage.description,
            canonical: createdPage.canonical,
            opengraphImage: createdPage.opengraphImage,
        }
    } catch (error) {
        if (error instanceof mongo.MongoServerError && error.code === 11000)
            throw new Error(pageErrors.slugAlreadyExists)
        throw new Error(pageErrors.pageNotCreated)
    }
}

const getPageBySlug: IPageModels['getPageBySlug'] = async slug => {
    await connectDB()
    const page = await pagesModel.findOne({ slug })
    return {
        title: page?.title,
        slug: page?.slug,
        content: page?.content,
        _id: page?._id.toString(),
        dynamicAdaptor: page?.dynamicAdaptor,
        description: page?.description,
        canonical: page?.canonical,
        opengraphImage: page?.opengraphImage,
    }
}

const getPageById: IPageModels['getPageById'] = async id => {
    await connectDB()
    const page = await pagesModel.findById(id)
    return {
        title: page?.title,
        slug: page?.slug,
        content: page?.content,
        _id: page?._id.toString(),
        dynamicAdaptor: page?.dynamicAdaptor,
        description: page?.description,
        canonical: page?.canonical,
        opengraphImage: page?.opengraphImage,
    }
}

const updatePage: IPageModels['updatePage'] = async page => {
    await connectDB()

    const existingPage = await pagesModel.findById(page._id)
    if (!existingPage) throw new Error(pageErrors.pageNotFound)

    Object.assign(existingPage, page)

    try {
        const updatedPage = await existingPage.save()
        return {
            title: updatedPage.title,
            slug: updatedPage.slug,
            content: updatedPage.content,
            _id: updatedPage._id.toString(),
            dynamicAdaptor: updatedPage.dynamicAdaptor,
            description: updatedPage.description,
            canonical: updatedPage.canonical,
            opengraphImage: updatedPage.opengraphImage,
        }
    } catch (error) {
        console.log(error)
        if (error instanceof mongo.MongoServerError && error.code === 11000)
            throw new Error(pageErrors.slugAlreadyExists)
        throw new Error(pageErrors.pageNotUpdated)
    }
}

const deletePage: IPageModels['deletePage'] = async id => {
    await connectDB()
    const deletedPage = await pagesModel.findByIdAndDelete(id)
    return {
        title: deletedPage?.title,
        slug: deletedPage?.slug,
        content: deletedPage?.content,
        _id: deletedPage?._id.toString(),
        dynamicAdaptor: deletedPage?.dynamicAdaptor,
        description: deletedPage?.description,
        canonical: deletedPage?.canonical,
        opengraphImage: deletedPage?.opengraphImage,
    }
}

export const pageModels: IPageModels = {
    getPages,
    createPage,
    getPageBySlug,
    getPageById,
    updatePage,
    deletePage,
}
