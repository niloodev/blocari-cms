import { setupDefaultFields, setupFields } from './setupFields'
import { customFields } from '@/modules/editor/fields'
import { defaultPuckContext } from './setupFields.constants'
import { DropZoneProps } from '@measured/puck'

vi.mock('@/modules/editor/fields', () => ({
    customFields: {
        color: vi.fn(),
    },
}))

describe('Tools: setupFields', () => {
    it('should return empty when no fields are provided', () => {
        const fields = setupFields({})
        expect(fields).toEqual({})
    })

    it('should return same fields when no custom is provided', () => {
        const fields = setupFields({
            text: {
                type: 'text',
            },
        })
        expect(fields).toEqual({ text: { type: 'text' } })
    })

    it('should return custom when type of custom is used', () => {
        const fields = setupFields({
            color: {
                type: 'color',
            },
        })
        expect(fields).toEqual({
            color: { type: 'custom', render: customFields.color },
        })
    })
})

describe('Tools: setupDefaultFields', () => {
    it('should return empty when no fields are provided', () => {
        const fields = setupDefaultFields({})
        expect(fields).toEqual({})
    })

    it('should return same fields when no custom is provided', () => {
        const fields = setupDefaultFields({
            text: { type: 'text' },
        })

        expect(fields).toEqual({
            text: { type: 'text' },
        })
    })
})

describe('Constants: defaultPuckContext', () => {
    it('should return null on renderDropZone', () => {
        expect(
            defaultPuckContext.puck.renderDropZone({} as DropZoneProps),
        ).toBeNull()
    })
})
