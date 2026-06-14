import { ComponentsWrapperProps } from './ComponentsWrapper.types'

export function ComponentsWrapper({ children }: ComponentsWrapperProps) {
    return (
        <div className="flex flex-col [&_[data-puck-drawer]]:flex-row [&_[data-puck-drawer]]:flex-wrap [&_[data-puck-drawer]]:justify-between">
            {children}
        </div>
    )
}
