import { describe, it, expect } from 'vitest'
import { setupSets } from './setupSets'

describe('Tools: setupSets', () => {
    it('should combine multiple sets of component configurations into a single object', () => {
        const sets = {
            genericSet: {
                componentA: { type: 'A', render: () => <></> },
                componentB: { type: 'B', render: () => <></> },
            },
            outroSet: {
                componentC: { type: 'C', render: () => <></> },
            },
        }

        const resultadoEsperado = {
            componentA: { type: 'A', render: expect.any(Function) },
            componentB: { type: 'B', render: expect.any(Function) },
            componentC: { type: 'C', render: expect.any(Function) },
        }

        const resultado = setupSets({ sets })
        expect(resultado).toEqual(resultadoEsperado)
    })

    it('should return an empty object if no sets are provided', () => {
        const sets = {}
        const resultado = setupSets({ sets })
        expect(resultado).toEqual({})
    })
})
