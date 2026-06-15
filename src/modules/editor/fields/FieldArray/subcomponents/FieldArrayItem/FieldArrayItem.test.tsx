import { fireEvent, render, screen } from '@testing-library/react'
import { FieldArrayItem } from './FieldArrayItem'

vi.mock('@/modules/editor/fields', () => ({
    fieldTypes: {
        text: ({
            value,
            onChange,
        }: {
            value: string
            onChange: (value: string) => void
        }) => (
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={value}
                onChange={e => onChange(e.target.value)}
            />
        ),
    },
}))

describe('FieldArray: FieldArrayItem', () => {
    it('should render correctly', () => {
        render(
            <FieldArrayItem
                field={{
                    type: 'array',
                    arrayFields: {
                        name: {
                            type: 'text',
                        },
                    },
                }}
                value={{ id: 0, name: 'John Doe' }}
                index={0}
                id={1}
                handleFieldChange={() => {}}
                handleRemove={() => {}}
            />,
        )

        expect(screen.getByText('John Doe')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Name')).toHaveValue('John Doe')
    })

    it('should open and close the item', () => {
        render(
            <FieldArrayItem
                field={{
                    type: 'array',
                    arrayFields: { name: { type: 'text' } },
                }}
                value={{ id: 0, name: 'John Doe' }}
                index={0}
                id={1}
                handleFieldChange={() => {}}
                handleRemove={() => {}}
            />,
        )

        const container = screen.getByLabelText('Campos do item')

        const button = screen.getByLabelText('Alternar campos do item')
        fireEvent.click(button)

        expect(container).toHaveClass('max-h-[1000px] mt-2')

        fireEvent.click(button)

        expect(container).toHaveClass('max-h-[0px] overflow-hidden')
    })

    it('should have working input implementation', () => {
        const handleFieldChange = vi.fn()

        render(
            <FieldArrayItem
                field={{
                    type: 'array',
                    arrayFields: { name: { type: 'text' } },
                }}
                value={{ id: 0, name: 'John Doe' }}
                index={0}
                id={1}
                handleFieldChange={handleFieldChange}
                handleRemove={() => {}}
            />,
        )

        const input = screen.getByPlaceholderText('Name')
        fireEvent.change(input, { target: { value: 'Jane Doe' } })

        expect(handleFieldChange).toHaveBeenCalledWith({
            index: 0,
            key: 'name',
            newValue: 'Jane Doe',
            props: { id: 0, name: 'John Doe' },
        })
    })

    it('should have working remove button implementation', () => {
        const handleRemove = vi.fn()

        render(
            <FieldArrayItem
                field={{
                    type: 'array',
                    arrayFields: { name: { type: 'text' } },
                }}
                value={{ id: 0, name: 'John Doe' }}
                index={0}
                id={1}
                handleFieldChange={() => {}}
                handleRemove={handleRemove}
            />,
        )

        const button = screen.getByLabelText('Remover item')
        fireEvent.click(button)

        expect(handleRemove).toHaveBeenCalledWith(0)
    })

    it('should fallback to fragment if field type is not found', () => {
        render(
            <FieldArrayItem
                field={{
                    type: 'array',
                    arrayFields: { name: { type: 'number' } },
                }}
                value={{ id: 0, name: 'John Doe' }}
                index={0}
                id={1}
                handleFieldChange={() => {}}
                handleRemove={() => {}}
            />,
        )

        expect(screen.queryByRole('spinbutton')).not.toBeInTheDocument()
    })

    it('should close the item when hover the grip', () => {
        render(
            <FieldArrayItem
                field={{
                    type: 'array',
                    arrayFields: { name: { type: 'text' } },
                }}
                value={{ id: 0, name: 'John Doe' }}
                index={0}
                id={1}
                handleFieldChange={() => {}}
                handleRemove={() => {}}
            />,
        )

        const container = screen.getByLabelText('Campos do item')
        const grip = screen.getByLabelText('Arrastar item')

        const button = screen.getByLabelText('Alternar campos do item')
        fireEvent.click(button)

        expect(container).toHaveClass('max-h-[1000px] mt-2')

        fireEvent.mouseDown(grip)

        expect(container).toHaveClass('max-h-[0px] overflow-hidden')
    })
})
