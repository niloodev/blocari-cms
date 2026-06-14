import { BaseField } from '@measured/puck'
import { z } from 'zod'

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
