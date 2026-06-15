import { describe, it, expect } from 'vitest'
import { setupComponent } from './setupComponent'
import {
    ComponentConfig,
    DefaultComponentProps,
    PuckComponent,
} from '@measured/puck'
import { ReactNode } from 'react'
import { Component as LucideComponent } from 'lucide-react'
import { createElement } from 'react'

const MockComponent: PuckComponent<DefaultComponentProps> = props =>
    createElement('div', props, 'Mock Component')

const exampleConfig: Omit<ComponentConfig<DefaultComponentProps>, 'render'> & {
    label: string
} = {
    label: 'Example Component',
}

describe('Tools: setupComponent', () => {
    it('should return the correct component config', () => {
        const result = setupComponent({
            component: MockComponent,
            config: exampleConfig,
        })
        expect(result.label).toBe('Example Component')
        expect(result.render).toBe(MockComponent)
    })

    it('should use the default icon if no icon is provided', () => {
        const result = setupComponent({
            component: MockComponent,
            config: exampleConfig,
        })
        expect(result.icon).toEqual(createElement(LucideComponent))
    })

    it('should use the provided icon', () => {
        const customIcon: ReactNode = createElement('div', null, 'Custom Icon')
        const result = setupComponent({
            component: MockComponent,
            config: exampleConfig,
            icon: customIcon,
        })
        expect(result.icon).toBe(customIcon)
    })
})
