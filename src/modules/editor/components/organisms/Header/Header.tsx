import { Button } from '@heroui/react'
import { ArrowLeft } from 'lucide-react'
import {
    PublishButton,
    ViewportButtons,
} from '@/modules/editor/components/molecules'
import { headerHeight } from './Header.constants'
import { PageStatus } from '@/modules/editor/components/molecules'

export function Header() {
    return (
        <header
            className={`min-h-[${headerHeight}] max-h-[${headerHeight}] bg-white p-2 flex items-center justify-between`}
        >
            <div className="w-[293px]">
                <Button className="bg-white gap-2 px-3 py-1.5 text-xs leading-4">
                    <ArrowLeft />
                    Voltar
                </Button>
            </div>
            <PageStatus />
            <ViewportButtons />
            <PublishButton />
        </header>
    )
}
