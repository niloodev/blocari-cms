'use client'

import { Puck } from '@measured/puck'
import {
    Header,
    headerHeight,
    Preview,
    MenusSidebar,
    PropertiesSidebar,
} from '@/modules/editor/components/organisms'
import { viewports } from '@/modules/editor/editor.constants'
import { uiConfig, plugins, config } from '@/modules/editor/editor.config'
import { EditorPageClientProps } from './EditorPage.types'

export function EditorPageClient({ initialPage }: EditorPageClientProps) {
    return (
        <Puck
            config={config}
            data={initialPage?.content ?? {}}
            plugins={plugins}
            ui={uiConfig}
            viewports={viewports}
        >
            <main className="flex flex-col max-h-[100vh] min-w-[1000px] h-[100vh] bg-[#F4F4F5] overflow-hidden">
                <Header />
                <div
                    className="flex justify-between flex-1 align-stretch relative"
                    style={{
                        maxHeight: `calc(100vh - ${headerHeight}px)`,
                    }}
                >
                    <MenusSidebar />
                    <Preview />
                    <PropertiesSidebar />
                </div>
            </main>
        </Puck>
    )
}
