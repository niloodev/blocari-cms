import { z } from 'zod'
import { fieldValidator } from './fieldValidator'

describe('Tools: fieldValidator', () => {
    it('should return valid for a value that passes the schema', () => {
        const schema = z.string()
        const validate = fieldValidator(schema) as (value: string) => {
            valid: boolean
            message: string
        }
        const result = validate('teste')
        expect(result.valid).toBe(true)
        expect(result.message).toBe('')
    })

    it('should return invalid for a value that does not pass the schema', () => {
        const schema = z.string()
        const validate = fieldValidator(schema) as (value: number) => {
            valid: boolean
            message: string
        }
        const result = validate(123)
        expect(result.valid).toBe(false)
        expect(result.message).not.toBe('')
    })

    it('should return the correct error message', () => {
        const schema = z.string()
        const validate = fieldValidator(schema) as (value: number) => {
            valid: boolean
            message: string
        }
        const result = validate(123)
        expect(result.message).toBe('Expected string, received number')
    })
})
