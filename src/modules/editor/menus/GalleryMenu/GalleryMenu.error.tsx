import { Alert } from '@/shared/libs/heroui'
import { MenuTitle } from '@/modules/editor/components/atoms'

export function GalleryMenuError() {
    return (
        <div className="menu-wrapper" data-testid="gallery-menu-error">
            <MenuTitle>Galeria</MenuTitle>
            <div className="scrollable-wrapper">
                <div className="flex flex-wrap justify-between pr-[2px] gap-[12px]">
                    <Alert
                        classNames={{
                            base: 'w-full flex-col align-center justify-center gap-2',
                            mainWrapper: 'flex-col gap-2',
                        }}
                        title="Erro ao carregar imagens"
                        description="Por favor, tente novamente mais tarde."
                        color="danger"
                    />
                </div>
            </div>
        </div>
    )
}
