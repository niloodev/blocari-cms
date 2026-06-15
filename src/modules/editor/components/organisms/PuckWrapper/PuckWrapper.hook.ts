import { usePuck } from '@measured/puck'
import { useEffect } from 'react'
import { IPage } from '@/core/models/pages'
import { rootDefaultProps } from '@/modules/editor/editor.config'

export function usePuckWrapper({ page }: { page?: IPage }) {
    const { dispatch } = usePuck()

    useEffect(() => {
        dispatch({
            type: 'setData',
            data: page?.content ?? {
                zones: {},
                content: [],
                root: {
                    props: rootDefaultProps,
                },
            },
        })
    }, [dispatch, page])
}
