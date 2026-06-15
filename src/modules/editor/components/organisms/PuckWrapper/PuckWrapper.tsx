import { Puck } from '@measured/puck'
import { PuckWrapperProps, PuckWrapperUpdaterProps } from './PuckWrapper.types'
import { usePuckWrapper } from './PuckWrapper.hook'

function PuckWrapperUpdater({ children, page }: PuckWrapperUpdaterProps) {
    usePuckWrapper({ page: page })
    return children
}

export function PuckWrapper({ children, page, ...props }: PuckWrapperProps) {
    return (
        <Puck {...props} data={page?.content ?? {}}>
            <PuckWrapperUpdater page={page}>
                <main className="flex flex-col max-h-[100vh] min-w-[1000px] h-[100vh] bg-content2 overflow-hidden">
                    {children}
                </main>
            </PuckWrapperUpdater>
        </Puck>
    )
}
