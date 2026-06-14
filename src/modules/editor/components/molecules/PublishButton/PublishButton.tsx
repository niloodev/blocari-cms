'use client'

import { Button } from '@heroui/react'
import { CloudUpload } from 'lucide-react'
import { usePublishButton } from './PublishButton.hook'

export function PublishButton() {
    const { pageId, handlePublish, isLoading } = usePublishButton()

    return (
        <Button
            isLoading={isLoading}
            onPress={handlePublish}
            className="px-3 py-1.5 bg-[#006FEE] gap-2 text-[#fff] text-xs leading-4 ml-2 w-[101px]"
        >
            <CloudUpload color="#fff" width={20} height={20} />
            {pageId ? 'Atualizar' : 'Publicar'}
        </Button>
    )
}
