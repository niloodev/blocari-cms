import { render, screen } from '@testing-library/react'
import { FieldAdaptors } from './FieldAdaptors'
import { useFieldAdaptors } from './FieldAdaptors.hook'

vi.mock('@/modules/editor/components/atoms', () => ({
    PropertyContainer: ({
        children,
        label,
    }: {
        children: React.ReactNode
        label?: string
    }) => (
        <div data-testid="property-container">
            {label && <label data-testid="property-label">{label}</label>}
            {children}
        </div>
    ),
}))

const mockAdapters = {
    'amazonas-cars': {
        adapterName: 'Amazonas Cars',
        availableMappedFields: [
            { id: 'ID-CARRO', isUnique: true },
            { id: 'MODELO', isUnique: false },
        ],
    },
    'amazonas-dealers': {
        adapterName: 'Amazonas Dealers',
        availableMappedFields: [
            { id: 'ID-DEALER', isUnique: true },
            { id: 'NOME', isUnique: false },
        ],
    },
}

vi.mock('@/adapters', () => ({
    get adapters() {
        return mockAdapters
    },
}))

describe('Fields: FieldAdaptors', () => {
    const mockOnValueChange = vi.fn()
    const mockValidator = vi.fn()

    beforeEach(() => {
        vi.clearAllMocks()
        Object.assign(mockAdapters, {
            'amazonas-cars': {
                adapterName: 'Amazonas Cars',
                availableMappedFields: [
                    { id: 'ID-CARRO', isUnique: true },
                    { id: 'MODELO', isUnique: false },
                ],
            },
            'amazonas-dealers': {
                adapterName: 'Amazonas Dealers',
                availableMappedFields: [
                    { id: 'ID-DEALER', isUnique: true },
                    { id: 'NOME', isUnique: false },
                ],
            },
        })
    })

    describe('Rendering', () => {
        it('should render with correct label', () => {
            render(
                <FieldAdaptors
                    label="Test Adaptor"
                    value=""
                    onValueChange={mockOnValueChange}
                    validator={mockValidator}
                />,
            )

            expect(screen.getByTestId('property-label')).toHaveTextContent(
                'Test Adaptor',
            )
            expect(screen.getAllByText('Adaptador')).toHaveLength(2)
        })

        it('should render select with placeholder', () => {
            render(
                <FieldAdaptors
                    label="Test Adaptor"
                    value=""
                    onValueChange={mockOnValueChange}
                    validator={mockValidator}
                />,
            )

            expect(screen.getByRole('button')).toBeInTheDocument()
        })

        it('should render all available adaptors as options', () => {
            render(
                <FieldAdaptors
                    label="Test Adaptor"
                    value=""
                    onValueChange={mockOnValueChange}
                    validator={mockValidator}
                />,
            )

            const hiddenSelect = screen.getByTestId('hidden-select-container')
            expect(hiddenSelect).toBeInTheDocument()

            expect(screen.getAllByText('Amazonas Cars')).toHaveLength(2)
            expect(screen.getAllByText('Amazonas Dealers')).toHaveLength(1)
        })
    })

    describe('Value handling', () => {
        it('should display selected value correctly', () => {
            render(
                <FieldAdaptors
                    label="Test Adaptor"
                    value="amazonas-cars"
                    onValueChange={mockOnValueChange}
                    validator={mockValidator}
                />,
            )

            expect(screen.getAllByText('Amazonas Cars')).toHaveLength(2)
        })

        it('should use first adaptor as default when no value provided', () => {
            render(
                <FieldAdaptors
                    label="Test Adaptor"
                    value=""
                    onValueChange={mockOnValueChange}
                    validator={mockValidator}
                />,
            )

            expect(screen.getByTestId('property-container')).toBeInTheDocument()
        })

        it('should handle undefined value gracefully', () => {
            render(
                <FieldAdaptors
                    label="Test Adaptor"
                    value={undefined}
                    onValueChange={mockOnValueChange}
                    validator={mockValidator}
                />,
            )

            expect(screen.getByTestId('property-container')).toBeInTheDocument()
        })

        it('should handle empty currentValue in selectedKeys', () => {
            render(
                <FieldAdaptors
                    label="Test Adaptor"
                    value=""
                    onValueChange={mockOnValueChange}
                    validator={mockValidator}
                />,
            )

            expect(screen.getByTestId('property-container')).toBeInTheDocument()
        })
    })

    describe('Selection changes', () => {
        it('should call onValueChange when adaptor is selected', () => {
            render(
                <FieldAdaptors
                    label="Test Adaptor"
                    value="amazonas-cars"
                    onValueChange={mockOnValueChange}
                    validator={mockValidator}
                />,
            )

            const { handleAdaptorChange } = useFieldAdaptors({
                validator: mockValidator,
                value: 'amazonas-cars',
                onValueChange: mockOnValueChange,
            })

            const mockSelection = new Set(['amazonas-dealers']) as any
            mockSelection.currentKey = 'amazonas-dealers'
            handleAdaptorChange(mockSelection)

            expect(mockOnValueChange).toHaveBeenCalledWith('amazonas-dealers')
        })

        it('should call onValueChange with first adaptor when selection is cleared', () => {
            render(
                <FieldAdaptors
                    label="Test Adaptor"
                    value="amazonas-dealers"
                    onValueChange={mockOnValueChange}
                    validator={mockValidator}
                />,
            )

            const { handleAdaptorChange } = useFieldAdaptors({
                validator: mockValidator,
                value: 'amazonas-dealers',
                onValueChange: mockOnValueChange,
            })

            const mockSelection = new Set([]) as any
            mockSelection.currentKey = ''
            handleAdaptorChange(mockSelection)

            expect(mockOnValueChange).toHaveBeenCalledWith('amazonas-cars')
        })

        it('should call onValueChange with first adaptor when currentKey is undefined', () => {
            const { handleAdaptorChange } = useFieldAdaptors({
                validator: mockValidator,
                value: 'amazonas-dealers',
                onValueChange: mockOnValueChange,
            })

            const mockSelection = new Set([]) as any
            mockSelection.currentKey = undefined
            handleAdaptorChange(mockSelection)

            expect(mockOnValueChange).toHaveBeenCalledWith('amazonas-cars')
        })

        it('should call onValueChange with first adaptor when currentKey is null', () => {
            const { handleAdaptorChange } = useFieldAdaptors({
                validator: mockValidator,
                value: 'amazonas-dealers',
                onValueChange: mockOnValueChange,
            })

            const mockSelection = new Set([]) as any
            mockSelection.currentKey = null
            handleAdaptorChange(mockSelection)

            expect(mockOnValueChange).toHaveBeenCalledWith('amazonas-cars')
        })
    })

    describe('Validation', () => {
        it('should display validation error when validator returns error', () => {
            const mockError = {
                valid: false,
                message: 'Adaptador é obrigatório',
            }
            mockValidator.mockReturnValue(mockError)

            render(
                <FieldAdaptors
                    label="Test Adaptor"
                    value=""
                    onValueChange={mockOnValueChange}
                    validator={mockValidator}
                />,
            )

            expect(
                screen.getByText('Adaptador é obrigatório'),
            ).toBeInTheDocument()
            expect(screen.getByText('Adaptador é obrigatório')).toHaveClass(
                'text-danger-500',
            )
        })

        it('should not display error when validator returns valid result', () => {
            const mockError = { valid: true }
            mockValidator.mockReturnValue(mockError)

            render(
                <FieldAdaptors
                    label="Test Adaptor"
                    value="amazonas-cars"
                    onValueChange={mockOnValueChange}
                    validator={mockValidator}
                />,
            )

            expect(
                screen.queryByText('Adaptador é obrigatório'),
            ).not.toBeInTheDocument()
        })

        it('should not display error when validator returns undefined', () => {
            mockValidator.mockReturnValue(undefined)

            render(
                <FieldAdaptors
                    label="Test Adaptor"
                    value="amazonas-cars"
                    onValueChange={mockOnValueChange}
                    validator={mockValidator}
                />,
            )

            expect(
                screen.queryByText('Adaptador é obrigatório'),
            ).not.toBeInTheDocument()
        })
    })

    describe('Hook functionality', () => {
        it('should return correct adaptors from hook', () => {
            const { adaptors } = useFieldAdaptors({
                validator: mockValidator,
                value: '',
                onValueChange: mockOnValueChange,
            })

            expect(adaptors).toHaveLength(2)
            expect(adaptors[0]).toEqual({
                label: 'Amazonas Cars',
                value: 'amazonas-cars',
            })
            expect(adaptors[1]).toEqual({
                label: 'Amazonas Dealers',
                value: 'amazonas-dealers',
            })
        })

        it('should return current value from hook', () => {
            const { currentValue } = useFieldAdaptors({
                validator: mockValidator,
                value: 'amazonas-dealers',
                onValueChange: mockOnValueChange,
            })

            expect(currentValue).toBe('amazonas-dealers')
        })

        it('should return first adaptor as default value when no value provided', () => {
            const { currentValue } = useFieldAdaptors({
                validator: mockValidator,
                value: '',
                onValueChange: mockOnValueChange,
            })

            expect(currentValue).toBe('amazonas-cars')
        })

        it('should call validator with current value', () => {
            useFieldAdaptors({
                validator: mockValidator,
                value: 'amazonas-cars',
                onValueChange: mockOnValueChange,
            })

            expect(mockValidator).toHaveBeenCalledWith('amazonas-cars')
        })

        it('should return empty string when value and adaptors are falsy', () => {
            Object.keys(mockAdapters).forEach(key => {
                delete mockAdapters[key as keyof typeof mockAdapters]
            })

            const { currentValue } = useFieldAdaptors({
                validator: mockValidator,
                value: '',
                onValueChange: mockOnValueChange,
            })

            expect(currentValue).toBe('')
        })

        it('should handle selectedKeys with empty currentValue', () => {
            Object.keys(mockAdapters).forEach(key => {
                delete mockAdapters[key as keyof typeof mockAdapters]
            })

            render(
                <FieldAdaptors
                    label="Test Adaptor"
                    value=""
                    onValueChange={mockOnValueChange}
                    validator={mockValidator}
                />,
            )

            expect(screen.getByTestId('property-container')).toBeInTheDocument()
        })
    })

    describe('Edge cases', () => {
        it('should handle null value gracefully', () => {
            render(
                <FieldAdaptors
                    label="Test Adaptor"
                    value={null as any}
                    onValueChange={mockOnValueChange}
                    validator={mockValidator}
                />,
            )

            expect(screen.getByTestId('property-container')).toBeInTheDocument()
        })

        it('should handle undefined onValueChange gracefully', () => {
            render(
                <FieldAdaptors
                    label="Test Adaptor"
                    value="amazonas-cars"
                    onValueChange={undefined}
                    validator={mockValidator}
                />,
            )

            expect(screen.getByTestId('property-container')).toBeInTheDocument()
        })
    })

    describe('Component structure', () => {
        it('should render with correct component structure', () => {
            render(
                <FieldAdaptors
                    label="Test Adaptor"
                    value="amazonas-cars"
                    onValueChange={mockOnValueChange}
                    validator={mockValidator}
                />,
            )

            expect(screen.getByTestId('property-container')).toBeInTheDocument()
        })

        it('should render select component', () => {
            render(
                <FieldAdaptors
                    label="Test Adaptor"
                    value="amazonas-cars"
                    onValueChange={mockOnValueChange}
                    validator={mockValidator}
                />,
            )

            expect(screen.getByRole('button')).toBeInTheDocument()
        })
    })
})
