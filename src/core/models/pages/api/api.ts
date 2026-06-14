import { Data } from '@measured/puck'
import { IPageModels } from '../pages.types'

const getPages: IPageModels['getPages'] = async () => {
    console.log('API Pages Fetched')
    return []
}

const createPage: IPageModels['createPage'] = async () => {
    console.log('API Page Created')
    return {
        title: 'teste',
        slug: '/teste',
        content: {} as Data,
        _id: '123',
    }
}

const getPageBySlug: IPageModels['getPageBySlug'] = async () => {
    console.log('API Page Fetched')
    return {
        title: 'teste',
        slug: '/teste',
        name: 'teste',
        content: {} as Data,
        _id: '123',
    }
}

const getPageById: IPageModels['getPageById'] = async () => {
    console.log('API Page Fetched')
    return {
        title: 'teste',
        slug: '/teste',
        content: {} as Data,
        name: 'teste',
        _id: '123',
    }
}

const updatePage: IPageModels['updatePage'] = async () => {
    console.log('API Page Updated')
    return {
        title: 'teste',
        slug: '/teste',
        content: {} as Data,
        name: 'teste',
        _id: '123',
    }
}

export const pageModels: IPageModels = {
    getPages,
    createPage,
    getPageBySlug,
    getPageById,
    updatePage,
}
