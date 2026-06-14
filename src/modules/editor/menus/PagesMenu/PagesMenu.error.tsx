import { Alert } from '@heroui/react'
import { MenuTitle } from '@/modules/editor/components/atoms'

export function PagesMenuError() {
    return (
        <div className="menu-wrapper">
            <MenuTitle>Páginas</MenuTitle>
            <div className="scrollable-wrapper">
                <div className="flex flex-wrap justify-between pr-[2px] gap-[12px]">
                    <Alert
                        classNames={{
                            base: 'w-full flex-col align-center justify-center gap-2',
                            mainWrapper: 'flex-col gap-2',
                        }}
                        title="Erro ao carregar páginas"
                        description="Por favor, tente novamente mais tarde."
                        color="danger"
                    />
                </div>
            </div>
        </div>
    )
}
