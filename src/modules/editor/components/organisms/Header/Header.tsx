import { Button } from '@/shared/libs/heroui'
import { ArrowLeft } from 'lucide-react'
import {
    PublishButton,
    ViewportButtons,
    PageStatus,
    DynamicRouteHelper,
} from '@/modules/editor/components/molecules'
import { headerHeight } from './Header.constants'
import { ThemeToggle } from '@/core/components/molecules'

export function Header() {
    return (
        <header
            className={`min-h-[${headerHeight}] max-h-[${headerHeight}] bg-content1 p-2 flex items-center justify-between`}
        >
            <div className="w-[295px] h-full gap-1 flex">
                <Button size="sm" className="bg-content2 min-h-full" isDisabled>
                    <ArrowLeft />
                    Voltar
                </Button>
                <ThemeToggle />
            </div>
            <PageStatus />
            <DynamicRouteHelper />
            <ViewportButtons />
            <PublishButton />
        </header>
    )
}
