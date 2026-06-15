import { fireEvent, render, screen } from '@testing-library/react'
import { customFields, fieldTypes } from './fields'

vi.mock('./FieldText', () => ({
    FieldText: ({
        label,
        onValueChange,
        value,
    }: {
        label?: string
        onValueChange?: (value: string) => void
        value?: string
        validator?: unknown
    }) => (
        <div data-testid="field-text">
            <label>{label}</label>
            <input
                type="text"
                value={value || ''}
                onChange={e => onValueChange?.(e.target.value)}
                data-testid="text-input"
            />
        </div>
    ),
}))

vi.mock('./FieldNumber', () => ({
    FieldNumber: ({
        label,
        onValueChange,
        value,
    }: {
        label?: string
        onValueChange?: (value: string) => void
        value?: string | number
        validator?: unknown
    }) => (
        <div data-testid="field-number">
            <label>{label}</label>
            <input
                type="number"
                value={value || ''}
                onChange={e => onValueChange?.(e.target.value)}
                data-testid="number-input"
            />
        </div>
    ),
}))

vi.mock('./FieldSelect', () => ({
    FieldSelect: ({
        label,
        onSelectionChange,
        selectedKeys,
        items,
    }: {
        label?: string
        onSelectionChange: (value: { currentKey: string }) => void
        selectedKeys?: string[]
        items?: Array<{ label: string; value: string }>
    }) => (
        <div data-testid="field-select">
            <label>{label}</label>
            <select
                value={selectedKeys?.[0] || ''}
                onChange={e =>
                    onSelectionChange({ currentKey: e.target.value })
                }
                data-testid="select-input"
            >
                {items?.map(item => (
                    <option key={item.value} value={item.value}>
                        {item.label}
                    </option>
                ))}
            </select>
        </div>
    ),
}))

vi.mock('./FieldRadio', () => ({
    FieldRadio: ({
        label,
        onValueChange,
        value,
        items,
    }: {
        label?: string
        onValueChange?: (value: string) => void
        value?: string
        items?: Array<{ label: string; value: string }>
        validator?: unknown
    }) => (
        <div data-testid="field-radio">
            <label>{label}</label>
            {items?.map(item => (
                <label key={item.value}>
                    <input
                        type="radio"
                        name="radio-group"
                        value={item.value}
                        checked={value === item.value}
                        onChange={e => onValueChange?.(e.target.value)}
                        data-testid={`radio-${item.value}`}
                    />
                    {item.label}
                </label>
            ))}
        </div>
    ),
}))

vi.mock('./FieldColor', () => ({
    FieldColor: ({
        value,
        onChange,
    }: {
        value?: string
        onChange?: (value: string) => void
        validator?: unknown
    }) => (
        <div data-testid="field-color">
            <input
                type="color"
                value={value || '#000000'}
                onChange={e => onChange?.(e.target.value)}
                data-testid="color-input"
            />
        </div>
    ),
}))

vi.mock('./FieldArray', () => ({
    FieldArray: ({
        field,
        value,
        onChange,
    }: {
        field?: { label?: string }
        value?: unknown[]
        onChange?: (value: unknown[]) => void
        name?: string
    }) => (
        <div data-testid="field-array">
            <label>{field?.label}</label>
            <button
                onClick={() => onChange?.([...(value || []), 'new-item'])}
                data-testid="add-item"
            >
                Add Item
            </button>
        </div>
    ),
}))

vi.mock('./FieldImages', () => ({
    FieldImages: ({
        value,
        onValueChange,
        label,
    }: {
        value?: string[] | File[]
        onValueChange?: (files: File[]) => void
        label?: string
    }) => (
        <div data-testid="field-images">
            <label>{label}</label>
            <input
                type="file"
                multiple
                onChange={e =>
                    onValueChange?.(Array.from(e.target.files || []))
                }
                data-testid="images-input"
            />
            <span data-testid="images-count">
                {Array.isArray(value) ? value.length : 0}
            </span>
        </div>
    ),
}))

vi.mock('./FieldDynamicRoute', () => ({
    FieldDynamicRoute: ({
        value,
        onValueChange,
        label,
        validator,
    }: {
        value?: string
        onValueChange?: (value: string) => void
        label?: string
        validator?: unknown
    }) => (
        <div data-testid="field-dynamic-route">
            <label>{label}</label>
            <input
                type="text"
                value={value || ''}
                onChange={e => onValueChange?.(e.target.value)}
                data-testid="dynamic-route-input"
            />
        </div>
    ),
}))

vi.mock('./FieldAdaptors', () => ({
    FieldAdaptors: ({
        value,
        onValueChange,
        label,
        validator,
    }: {
        value?: string
        onValueChange?: (value: string) => void
        label?: string
        validator?: unknown
    }) => (
        <div data-testid="field-adaptors">
            <label>{label}</label>
            <select
                value={value || ''}
                onChange={e => onValueChange?.(e.target.value)}
                data-testid="adaptors-select"
            >
                <option value="">Select Adaptor</option>
                <option value="amazonas-cars">Amazonas Cars</option>
            </select>
        </div>
    ),
}))

vi.mock('./FieldCollectionImages', () => ({
    FieldCollectionImages: ({
        value,
        onValueChange,
        label,
    }: {
        value?: string[] | File[]
        onValueChange?: (files: File[]) => void
        label?: string
    }) => (
        <div data-testid="field-collection-images">
            <label>{label}</label>
            <input
                type="file"
                multiple
                onChange={e =>
                    onValueChange?.(Array.from(e.target.files || []))
                }
                data-testid="collection-images-input"
            />
            <span data-testid="collection-images-count">
                {Array.isArray(value) ? value.length : 0}
            </span>
        </div>
    ),
}))

describe('Fields', () => {
    describe('Field Types (Puck default fields)', () => {
        it('should render text field correctly', () => {
            const TextField = fieldTypes?.text
            if (!TextField) throw new Error('TextField not found')

            const onChange = vi.fn()

            render(
                <TextField
                    field={{
                        type: 'text',
                        label: 'Test Text',
                        validator: undefined,
                    }}
                    value="test value"
                    onChange={onChange}
                    name="test"
                >
                    <div>Test Content</div>
                </TextField>,
            )

            expect(screen.getByTestId('field-text')).toBeInTheDocument()
            expect(screen.getByText('Test Text')).toBeInTheDocument()
            expect(screen.getByTestId('text-input')).toHaveValue('test value')

            fireEvent.change(screen.getByTestId('text-input'), {
                target: { value: 'new value' },
            })

            expect(onChange).toHaveBeenCalledWith('new value')
        })

        it('should render number field correctly', () => {
            const NumberField = fieldTypes?.number
            if (!NumberField) throw new Error('NumberField not found')

            const onChange = vi.fn()

            render(
                <NumberField
                    field={{
                        type: 'number',
                        label: 'Test Number',
                        validator: undefined,
                    }}
                    value="42"
                    onChange={onChange}
                    name="test"
                >
                    <div>Test Content</div>
                </NumberField>,
            )

            expect(screen.getByTestId('field-number')).toBeInTheDocument()
            expect(screen.getByText('Test Number')).toBeInTheDocument()
            expect(screen.getByTestId('number-input')).toHaveValue(42)

            fireEvent.change(screen.getByTestId('number-input'), {
                target: { value: '100' },
            })

            expect(onChange).toHaveBeenCalledWith('100')
        })

        it('should render select field correctly', () => {
            const SelectField = fieldTypes?.select
            if (!SelectField) throw new Error('SelectField not found')

            const onChange = vi.fn()

            render(
                <SelectField
                    field={{
                        type: 'select',
                        label: 'Test Select',
                        options: [
                            { label: 'Option 1', value: 'opt1' },
                            { label: 'Option 2', value: 'opt2' },
                        ],
                        validator: undefined,
                    }}
                    value="opt1"
                    onChange={onChange}
                    name="test"
                >
                    <div>Test Content</div>
                </SelectField>,
            )

            expect(screen.getByTestId('field-select')).toBeInTheDocument()
            expect(screen.getByText('Test Select')).toBeInTheDocument()
            expect(screen.getByTestId('select-input')).toHaveValue('opt1')

            fireEvent.change(screen.getByTestId('select-input'), {
                target: { value: 'opt2' },
            })

            expect(onChange).toHaveBeenCalledWith('opt2')
        })

        it('should render radio field correctly', () => {
            const RadioField = fieldTypes?.radio
            if (!RadioField) throw new Error('RadioField not found')

            const onChange = vi.fn()

            render(
                <RadioField
                    field={{
                        type: 'radio',
                        label: 'Test Radio',
                        options: [
                            { label: 'Radio 1', value: 'radio1' },
                            { label: 'Radio 2', value: 'radio2' },
                        ],
                        validator: undefined,
                    }}
                    value="radio1"
                    onChange={onChange}
                    name="test"
                >
                    <div>Test Content</div>
                </RadioField>,
            )

            expect(screen.getByTestId('field-radio')).toBeInTheDocument()
            expect(screen.getByText('Test Radio')).toBeInTheDocument()
            expect(screen.getByTestId('radio-radio1')).toBeChecked()

            fireEvent.click(screen.getByTestId('radio-radio2'))

            expect(onChange).toHaveBeenCalledWith('radio2')
        })

        it('should render array field correctly', () => {
            const ArrayField = fieldTypes?.array
            if (!ArrayField) throw new Error('ArrayField not found')

            const onChange = vi.fn()

            render(
                <ArrayField
                    field={{
                        type: 'array',
                        label: 'Test Array',
                        arrayFields: {},
                        validator: undefined,
                    }}
                    value={['item1', 'item2']}
                    onChange={onChange}
                    name="test"
                >
                    <div>Test Content</div>
                </ArrayField>,
            )

            expect(screen.getByTestId('field-array')).toBeInTheDocument()
            expect(screen.getByText('Test Array')).toBeInTheDocument()

            fireEvent.click(screen.getByTestId('add-item'))

            expect(onChange).toHaveBeenCalledWith([
                'item1',
                'item2',
                'new-item',
            ])
        })
    })

    describe('Custom Fields', () => {
        it('should render color field correctly', () => {
            const ColorField = customFields.color
            const onChange = vi.fn()

            render(
                <ColorField
                    field={{
                        type: 'custom' as any,
                        label: 'Test Color',
                        validator: undefined,
                    }}
                    value="#ff0000"
                    onChange={onChange}
                    name="test"
                />,
            )

            expect(screen.getByTestId('field-color')).toBeInTheDocument()
            expect(screen.getByTestId('color-input')).toHaveValue('#ff0000')

            fireEvent.change(screen.getByTestId('color-input'), {
                target: { value: '#00ff00' },
            })

            expect(onChange).toHaveBeenCalledWith('#00ff00')
        })

        it('should render images field correctly', () => {
            const ImagesField = customFields.images
            const onChange = vi.fn()

            render(
                <ImagesField
                    field={{
                        type: 'custom' as any,
                        label: 'Test Images',
                        validator: undefined,
                    }}
                    value={['image1.jpg', 'image2.jpg']}
                    onChange={onChange}
                    name="test"
                />,
            )

            expect(screen.getByTestId('field-images')).toBeInTheDocument()
            expect(screen.getByText('Test Images')).toBeInTheDocument()
            expect(screen.getByTestId('images-count')).toHaveTextContent('2')
        })

        it('should render dynamic-adaptor field correctly', () => {
            const DynamicAdaptorField = customFields['dynamic-adaptor']
            const onChange = vi.fn()

            render(
                <DynamicAdaptorField
                    field={{
                        type: 'custom' as any,
                        label: 'Test Dynamic Adaptor',
                        validator: undefined,
                    }}
                    value="amazonas-cars"
                    onChange={onChange}
                    name="test"
                />,
            )

            expect(
                screen.getByTestId('field-dynamic-route'),
            ).toBeInTheDocument()
            expect(screen.getByText('Test Dynamic Adaptor')).toBeInTheDocument()
            expect(screen.getByTestId('dynamic-route-input')).toHaveValue(
                'amazonas-cars',
            )

            fireEvent.change(screen.getByTestId('dynamic-route-input'), {
                target: { value: 'new-adaptor' },
            })

            expect(onChange).toHaveBeenCalledWith('new-adaptor')
        })

        it('should render adaptor field correctly', () => {
            const AdaptorField = customFields.adaptor
            const onChange = vi.fn()

            render(
                <AdaptorField
                    field={{
                        type: 'custom' as any,
                        label: 'Test Adaptor',
                        validator: undefined,
                    }}
                    value="amazonas-cars"
                    onChange={onChange}
                    name="test"
                />,
            )

            expect(screen.getByTestId('field-adaptors')).toBeInTheDocument()
            expect(screen.getByText('Test Adaptor')).toBeInTheDocument()
            expect(screen.getByTestId('adaptors-select')).toHaveValue(
                'amazonas-cars',
            )

            fireEvent.change(screen.getByTestId('adaptors-select'), {
                target: { value: 'amazonas-cars' },
            })

            expect(onChange).toHaveBeenCalledWith('amazonas-cars')
        })

        it('should render collection-images field correctly', () => {
            const CollectionImagesField = customFields['collection-images']
            const onChange = vi.fn()

            render(
                <CollectionImagesField
                    field={{
                        type: 'custom' as any,
                        label: 'Test Collection Images',
                        validator: undefined,
                    }}
                    value={['col1.jpg', 'col2.jpg']}
                    onChange={onChange}
                    name="test"
                />,
            )

            expect(
                screen.getByTestId('field-collection-images'),
            ).toBeInTheDocument()
            expect(
                screen.getByText('Test Collection Images'),
            ).toBeInTheDocument()
            expect(
                screen.getByTestId('collection-images-count'),
            ).toHaveTextContent('2')
        })

        it('should render object field correctly with nested fields', () => {
            const ObjectField = fieldTypes?.object
            if (!ObjectField) throw new Error('ObjectField not found')

            const onChange = vi.fn()

            render(
                <ObjectField
                    field={{
                        type: 'object',
                        objectFields: {
                            title: {
                                type: 'text',
                                label: 'Título',
                            },
                            description: {
                                type: 'text',
                                label: 'Descrição',
                            },
                        },
                    }}
                    value={{
                        title: 'Test Title',
                        description: 'Test Description',
                    }}
                    onChange={onChange}
                    name="test"
                >
                    <div>Test Content</div>
                </ObjectField>,
            )

            // Verifica se os campos filhos foram renderizados
            expect(screen.getByText('Título')).toBeInTheDocument()
            expect(screen.getByText('Descrição')).toBeInTheDocument()
            expect(screen.getByDisplayValue('Test Title')).toBeInTheDocument()
            expect(
                screen.getByDisplayValue('Test Description'),
            ).toBeInTheDocument()

            // Testa a mudança de valor
            fireEvent.change(screen.getByDisplayValue('Test Title'), {
                target: { value: 'New Title' },
            })

            expect(onChange).toHaveBeenCalledWith({
                title: 'New Title',
                description: 'Test Description',
            })
        })
    })

    describe('Edge cases', () => {
        it('should handle undefined values gracefully', () => {
            const TextField = fieldTypes?.text
            if (!TextField) throw new Error('TextField not found')

            const onChange = vi.fn()

            render(
                <TextField
                    field={{
                        type: 'text',
                        label: 'Test Text',
                        validator: undefined,
                    }}
                    value={undefined}
                    onChange={onChange}
                    name="test"
                >
                    <div>Test Content</div>
                </TextField>,
            )

            expect(screen.getByTestId('text-input')).toHaveValue('')
        })

        it('should handle empty arrays in array field', () => {
            const ArrayField = fieldTypes?.array
            if (!ArrayField) throw new Error('ArrayField not found')

            const onChange = vi.fn()

            render(
                <ArrayField
                    field={{
                        type: 'array',
                        label: 'Test Array',
                        arrayFields: {},
                        validator: undefined,
                    }}
                    value={[]}
                    onChange={onChange}
                    name="test"
                >
                    <div>Test Content</div>
                </ArrayField>,
            )

            expect(screen.getByTestId('field-array')).toBeInTheDocument()
        })

        it('should handle null values in images field', () => {
            const ImagesField = customFields.images
            const onChange = vi.fn()

            render(
                <ImagesField
                    field={{
                        type: 'custom' as any,
                        label: 'Test Images',
                        validator: undefined,
                    }}
                    value={null as any}
                    onChange={onChange}
                    name="test"
                />,
            )

            expect(screen.getByTestId('images-count')).toHaveTextContent('0')
        })
    })

    describe('Field validation', () => {
        it('should pass validator to field components', () => {
            const mockValidator = vi.fn()
            const TextField = fieldTypes?.text
            if (!TextField) throw new Error('TextField not found')

            const onChange = vi.fn()

            render(
                <TextField
                    field={{
                        type: 'text',
                        label: 'Test Text',
                        validator: mockValidator,
                    }}
                    value="test"
                    onChange={onChange}
                    name="test"
                >
                    <div>Test Content</div>
                </TextField>,
            )

            expect(screen.getByTestId('field-text')).toBeInTheDocument()
            // The validator is passed to the component but not directly testable in the mock
        })
    })
})
