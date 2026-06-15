import { describe, it, expect, vi } from 'vitest'
import {
    uiConfig,
    plugins,
    rootFields,
    rootDefaultProps,
    config,
} from './editor.config'
import { viewports } from '@/modules/editor/editor.constants'

const mocks = vi.hoisted(() => ({
    viewports: vi.fn().mockReturnValue([{ width: 1024, height: 768 }]),
}))

vi.mock('@/modules/editor/editor.constants', async importOriginal => {
    const actual =
        await importOriginal<
            typeof import('@/modules/editor/editor.constants')
        >()
    return {
        ...actual,
        get viewports() {
            return mocks.viewports()
        },
    }
})

vi.mock('@/shared/tools', async importOriginal => {
    const actual = await importOriginal<typeof import('@/shared/tools')>()
    return {
        ...actual,
        fieldValidator: vi.fn(),
    }
})

vi.mock('@/core/models/pages/pages.schemas', () => ({
    pageSchema: {
        shape: {
            title: {},
            slug: {},
        },
    },
    titleSchema: {},
    slugSchema: {},
    dynamicAdaptorSchema: {},
    descriptionSchema: {},
    canonicalSchema: {},
    opengraphImageSchema: {},
}))

describe('Modules: Editor Config', () => {
    it('should have correct uiConfig', () => {
        expect(uiConfig.viewports?.current.width).toBe(viewports[0].width)
        expect(uiConfig.viewports?.current.height).toBe(viewports[0].height)
        expect(uiConfig.viewports?.controlsVisible).toBe(true)
        expect(uiConfig.viewports?.options).toEqual([])
    })

    it('should fallback height to auto when not provided', async () => {
        mocks.viewports.mockReturnValue([{ width: 1024, height: null }])

        vi.resetModules()
        const { uiConfig } = await import('./editor.config')

        expect(uiConfig.viewports?.current.height).toBe('auto')
    })

    it('should have correct plugins configuration', () => {
        expect(plugins).toHaveLength(1)
        expect(plugins[0].overrides).toHaveProperty('iframe')
        expect(plugins[0].overrides).toHaveProperty('components')
        expect(plugins[0].overrides).toHaveProperty('componentItem')
        expect(plugins[0].overrides).toHaveProperty('fields')
        expect(plugins[0].overrides).toHaveProperty('fieldTypes')
    })

    it('should have correct rootFields configuration', () => {
        expect(rootFields.title.label).toBe('Título')
        expect(rootFields.title.type).toBe('text')
        expect(rootFields.slug.label).toBe('Slug')
        expect(rootFields.slug.type).toBe('text')
    })

    it('should have correct rootDefaultProps', () => {
        expect(rootDefaultProps.title).toBe('')
        expect(rootDefaultProps.slug).toBe('')
    })

    it('should have correct config structure', () => {
        expect(config.root?.fields).toEqual(rootFields)
        expect(config.root?.defaultProps).toEqual(rootDefaultProps)
        expect(config.components).toBeDefined()
    })
})
