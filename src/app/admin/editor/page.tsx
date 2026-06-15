import { EditorPage } from '@/modules/editor/components/pages'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Editar Página',
}

interface EditorProps {
    searchParams: Promise<{
        id: string
    }>
}

export default async function Editor({ searchParams }: EditorProps) {
    const id = (await searchParams)?.id

    return <EditorPage id={id} />
}
