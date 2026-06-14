/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentConfig } from '@measured/puck'
import { ReactNode } from 'react'

/**
 * Combina múltiplos conjuntos de configurações de componentes em um único objeto
 *
 * @param {Object} params - Parâmetros da função
 * @param {Record<string, Record<string, ComponentConfig>>} params.sets - Objeto contendo conjuntos de componentes
 *        onde a chave externa é o nome do conjunto e o valor é um objeto com as configurações dos componentes
 * @returns {Record<string, ComponentConfig>} Um objeto único combinando todas as configurações de componentes
 *
 * @example
 * const sets = {
 *   genericSet: {
 *     componentA: { type: 'A', ... },
 *     componentB: { type: 'B', ... }
 *   },
 *   outroSet: {
 *     componentC: { type: 'C', ... }
 *   }
 * }
 * setupSets({ sets })
 * // Retorna: { componentA: { type: 'A', ... }, componentB: { type: 'B', ... }, componentC: { type: 'C', ... } }
 */
export function setupSets({
    sets,
}: {
    sets: Record<string, { [key: string]: ComponentConfig<any> }>
}): Record<string, ComponentConfig<any> & { icon: ReactNode }> {
    return Object.entries(sets).reduce((acc, [, components]) => {
        return {
            ...acc,
            ...components,
        }
    }, {})
}
