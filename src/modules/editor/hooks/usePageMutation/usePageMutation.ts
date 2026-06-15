import { IPage } from '@/core/models/pages'

import { updatePage, createPage, deletePage } from '@/core/controllers/pages'
import { addToast } from '@/shared/libs/heroui'
import { Data } from '@measured/puck'
import { pageSchema } from '@/core/models/pages/pages.schemas'
import { UsePageMutationProps, MutateProps } from './usePageMutation.types'
import { useEditor, useEditorRouter } from '@/modules/editor/store'
import { useCallback, useMemo, useState } from 'react'

export function usePageMutation({ mutationType }: UsePageMutationProps) {
    const [isLoading, setIsLoading] = useState(false)
    const { replace } = useEditorRouter()
    const { setPublishedData } = useEditor()

    const mutations = useMemo(
        () => ({
            update: {
                action: async (updatedPage: IPage) => {
                    const page = await updatePage(updatedPage)
                    if (page.status == 'error') throw new Error(page.error)
                    setPublishedData(page.payload)
                    return page
                },
                feedback: 'Página atualizada com sucesso',
                message: 'Você já consegue acessar publicamente! 🎉',
            },
            create: {
                action: async (newPage: IPage) => {
                    const page = await createPage(newPage)
                    if (page.status == 'error') throw new Error(page.error)

                    setPublishedData(page?.payload)

                    replace(`/admin/editor?id=${page.payload?._id}`)
                    return page
                },
                feedback: 'Página criada com sucesso',
                message: 'Tudo certinho por aqui! 🚀',
            },
            delete: {
                action: async ({ _id = '' }: { _id?: string }) => {
                    const page = await deletePage(_id)
                    if (page.status == 'error') throw new Error(page.error)

                    setPublishedData({
                        _id: undefined,
                        title: '',
                        slug: '',
                        dynamicAdaptor: '',
                        content: {} as Data,
                        description: '',
                        canonical: '',
                        opengraphImage: '',
                    })

                    replace('/admin/editor')
                    return page
                },
                feedback: 'Página deletada com sucesso',
                message: 'Estamos te redirecionando para uma página em branco!',
            },
        }),
        [replace, setPublishedData],
    )

    const mutate = useCallback(
        async ({ id, data }: MutateProps) => {
            const root = data.root as Data['root'] & {
                props: IPage
            }

            const payload: IPage = {
                _id: id,
                title: root.props?.title || '',
                slug: root.props?.slug || '',
                dynamicAdaptor: root.props?.dynamicAdaptor || '',
                content: data,
                description: root.props?.description || '',
                canonical: root.props?.canonical || '',
                opengraphImage: root.props?.opengraphImage || '',
            } as IPage

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
                setIsLoading(true)
                const page = await mutations[mutationType].action({
                    ...payload,
                })

                addToast({
                    title: mutations[mutationType].feedback,
                    description: mutations[mutationType].message,
                    color: 'success',
                })

                return page
            } catch (error) {
                addToast({
                    title: 'Erro ao criar ou atualizar página',
                    description: (error as Error)?.message,
                    color: 'danger',
                })
            } finally {
                setIsLoading(false)
            }
        },
        [mutations, mutationType],
    )

    return { mutate, isLoading }
}
