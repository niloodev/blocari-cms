import { connectDB } from '@/core/services/mongodb'
import { IPageModels } from '../pages.types'
import { pagesModel } from './standalone.schemas'
import { mongo } from 'mongoose'
import { pageErrors } from '@/core/controllers/pages/pages.errors'

const getPages: IPageModels['getPages'] = async () => {
    await connectDB()
    const pages = await pagesModel.find()
    return pages.map(page => ({
        title: page.title,
        slug: page.slug,
        content: page.content,
        name: page.name,
        _id: page._id.toString(),
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
            name: createdPage.name,
            _id: createdPage._id.toString(),
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
        name: page?.name,
        _id: page?._id.toString(),
    }
}

const getPageById: IPageModels['getPageById'] = async id => {
    await connectDB()
    const page = await pagesModel.findById(id)
    return {
        title: page?.title,
        slug: page?.slug,
        content: page?.content,
        name: page?.name,
        _id: page?._id.toString(),
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
            name: updatedPage.name,
            _id: updatedPage._id.toString(),
        }
    } catch (error) {
        if (error instanceof mongo.MongoServerError && error.code === 11000)
            throw new Error(pageErrors.slugAlreadyExists)
        throw new Error(pageErrors.pageNotUpdated)
    }
}

export const pageModels: IPageModels = {
    getPages,
    createPage,
    getPageBySlug,
    getPageById,
    updatePage,
}
