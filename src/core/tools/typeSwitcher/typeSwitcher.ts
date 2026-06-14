import { ITypeSwitcherProps, Types } from './typeSwitcher.types'

/**
 * Função que retorna um objeto ou função baseado no tipo de ambiente configurado
 * @param props - Propriedades contendo o objeto switch com as opções para cada tipo
 * @param props.switch - Objeto que mapeia cada tipo ('standalone' | 'api') para um objeto ou função
 * @returns O objeto ou função correspondente ao tipo de ambiente atual
 * @example
 * ```typescript
 * const result = typeSwitcher({
 *   switch: {
 *     standalone: { foo: 'bar' },
 *     api: () => ({ foo: 'baz' })
 *   }
 * });
 * ```
 */
export const typeSwitcher = <T>(props: ITypeSwitcherProps<T>) => {
    return props.switch[(process.env.TYPE as Types) ?? 'standalone']
}
