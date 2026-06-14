import { EditorPage } from '@/modules/editor/components/pages'

interface EditorProps {
    params: Promise<{
        id: string[]
    }>
}

export default async function Editor({ params }: EditorProps) {
    const { id } = await params

    await new Promise(resolve => setTimeout(resolve, 1000))
    return <EditorPage id={id?.[0]} />
}
