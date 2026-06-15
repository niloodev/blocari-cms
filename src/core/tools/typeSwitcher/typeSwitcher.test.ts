import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { typeSwitcher } from './typeSwitcher'

const originalEnv = process.env

beforeEach(() => {
    process.env = { ...originalEnv }
})

afterEach(() => {
    process.env = originalEnv
})

describe('Tools: Type Switcher', () => {
    it('should return the object for the standalone type', () => {
        process.env.TYPE = 'standalone'
        const result = typeSwitcher<
            | {
                  foo: string
              }
            | (() => {
                  foo: string
              })
        >({
            switch: {
                standalone: { foo: 'bar' },
                api: () => ({ foo: 'baz' }),
            },
        })
        expect(result).toEqual({ foo: 'bar' })
    })

    it('should return the function for the api type', () => {
        process.env.TYPE = 'api'
        const result = typeSwitcher<
            | {
                  foo: string
              }
            | (() => {
                  foo: string
              })
        >({
            switch: {
                standalone: { foo: 'bar' },
                api: () => ({ foo: 'baz' }),
            },
        })
        if (typeof result === 'function') {
            expect(result()).toEqual({ foo: 'baz' })
        }
    })

    it('should return the object for the standalone type when TYPE is not defined', () => {
        delete process.env.TYPE
        const result = typeSwitcher<
            | {
                  foo: string
              }
            | (() => {
                  foo: string
              })
        >({
            switch: {
                standalone: { foo: 'bar' },
                api: () => ({ foo: 'baz' }),
            },
        })
        expect(result).toEqual({ foo: 'bar' })
    })
})
