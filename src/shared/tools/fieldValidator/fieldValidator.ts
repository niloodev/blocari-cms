import { BaseField } from '@measured/puck'
import { z } from 'zod'

/**
 * Valida um campo usando um esquema Zod.
 *
 * @template T - O tipo do valor a ser validado.
 * @param {z.ZodSchema} schema - O esquema Zod usado para validação.
 * @returns {BaseField['validator']} - Uma função que valida o valor e retorna um objeto com a mensagem de erro e a validade.
 */
export const fieldValidator = <T>(
    schema: z.ZodSchema,
): BaseField['validator'] => {
    return (value: T) => {
        const result = schema.safeParse(value)
        return {
            message: result.error?.issues[0].message || '',
            valid: result.success,
        }
    }
}
