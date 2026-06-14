import { IPage } from '@/core/models/pages'

import { updatePage, createPage } from '@/core/controllers/pages'
import { CreateOrUpdatePageProps } from './createOrUpdatePage.types'
import { addToast } from '@heroui/react'
import { Data } from '@measured/puck'
import { pageSchema } from '@/core/models/pages/pages.schemas'

export async function createOrUpdatePage({
    id,
    data,
    setPublishedData,
}: CreateOrUpdatePageProps) {
    const mutationType = id ? 'update' : 'create'

    const mutations = {
        update: {
            action: updatePage,
            feedback: 'Página atualizada com sucesso',
            message: 'Você já consegue acessar publicamente! 🎉',
        },
        create: {
            action: createPage,
            feedback: 'Página criada com sucesso',
            message: 'Tudo certinho por aqui! 🚀',
        },
    }

    const root = data.root as Data['root'] & {
        props: IPage
    }

    const payload: IPage = {
        title: root.props?.title,
        slug: root.props?.slug,
        content: data,
    }

    if (!pageSchema?.safeParse(payload).success) {
        const error = pageSchema?.safeParse(payload).error?.issues[0]

        addToast({
            title: `Há problemas com os seus campos`,
            description: error?.message,
            color: 'warning',
        })
        return
    }

    try {
        const page = await mutations[mutationType].action({
            _id: id,
            ...payload,
        })
        if ('error' in page) throw new Error(page.error)

        setPublishedData(page.payload)
        addToast({
            title: mutations[mutationType].feedback,
            description: mutations[mutationType].message,
            color: 'success',
        })
        return page
    } catch (error) {
        addToast({
            title: 'Erro ao criar ou atualizar página',
            description: error instanceof Error ? error.message : '',
            color: 'danger',
        })
    }
}
