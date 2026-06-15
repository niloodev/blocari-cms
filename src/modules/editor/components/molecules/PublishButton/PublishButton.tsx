'use client'

import { Button } from '@/shared/libs/heroui'
import { CloudUpload } from 'lucide-react'
import { usePublishButton } from './PublishButton.hook'

export function PublishButton() {
    const { pageId, handlePublish, isLoading } = usePublishButton()

    return (
        <Button
            isLoading={isLoading}
            onPress={handlePublish}
            size="sm"
            className="bg-primary-700 text-background ml-2 h-full"
            startContent={!isLoading && <CloudUpload width={20} height={20} />}
        >
            {pageId ? 'Atualizar' : 'Publicar'}
        </Button>
    )
}
