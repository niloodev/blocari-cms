import { render, screen, fireEvent } from '@testing-library/react'
import { FieldText } from './FieldText'
import { z } from 'zod'
import { fieldValidator } from '@/shared/tools'
import { useDroppable, useDndMonitor } from '@dnd-kit/core'

vi.mock('@dnd-kit/core', () => ({
    useDroppable: vi.fn(),
    useDndMonitor: vi.fn(),
}))

vi.mock('@/modules/editor/components/atoms', () => ({
    PropertyContainer: ({
        children,
        label,
    }: {
        children: React.ReactNode
        label: string
    }) => (
        <div data-testid="property-container" data-label={label}>
            {children}
        </div>
    ),
}))

vi.mock('@/shared/libs/heroui', () => ({
    Input: ({
        value,
        onValueChange,
        isInvalid,
        errorMessage,
        className,
        size,
        type,
        ...props
    }: any) => (
        <input
            type="text"
            value={value || ''}
            onChange={e => onValueChange?.(e.target.value)}
            data-invalid={isInvalid}
            data-error={errorMessage}
            data-size={size}
            data-type={type}
            className={className}
            {...props}
        />
    ),
}))

const mockUseDroppable = vi.mocked(useDroppable)
const mockUseDndMonitor = vi.mocked(useDndMonitor)

describe('Fields: FieldText', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        mockUseDroppable.mockReturnValue({
            setNodeRef: vi.fn() as any,
            isOver: false,
            active: null,
            node: null,
        } as any)
        mockUseDndMonitor.mockImplementation(() => {})
    })

    describe('Basic rendering', () => {
        it('should render correctly with default props', () => {
            render(<FieldText />)

            expect(screen.getByRole('textbox')).toBeInTheDocument()
            expect(screen.getByTestId('property-container')).toBeInTheDocument()
            expect(screen.getByTestId('property-container')).toHaveAttribute(
                'data-label',
                'Texto',
            )
        })

        it('should render with custom label', () => {
            render(<FieldText label="Custom Field Name" />)

            expect(screen.getByTestId('property-container')).toHaveAttribute(
                'data-label',
                'Custom Field Name',
            )
        })

        it('should render with initial value', () => {
            render(<FieldText value="Initial value" />)

            expect(screen.getByRole('textbox')).toHaveValue('Initial value')
        })

        it('should render with empty value when value is undefined', () => {
            render(<FieldText value={undefined} />)

            expect(screen.getByRole('textbox')).toHaveValue('')
        })
    })

    describe('Input functionality', () => {
        it('should call onValueChange when value changes', () => {
            const onValueChange = vi.fn()
            render(<FieldText onValueChange={onValueChange} />)

            const input = screen.getByRole('textbox')
            fireEvent.change(input, { target: { value: 'new value' } })

            expect(onValueChange).toHaveBeenCalledWith('new value')
        })

        it('should pass additional props to Input', () => {
            render(<FieldText placeholder="Type here" disabled />)

            const input = screen.getByRole('textbox')
            expect(input).toHaveAttribute('placeholder', 'Type here')
            expect(input).toHaveAttribute('disabled')
        })
    })

    describe('Validation', () => {
        it('should apply validation when validator is provided', () => {
            const validator = fieldValidator(
                z.string().min(3, 'Minimum 3 characters'),
            )
            render(<FieldText validator={validator} value="ab" />)

            const input = screen.getByRole('textbox')
            expect(input).toHaveAttribute('data-invalid', 'true')
            expect(input).toHaveAttribute('data-error', 'Minimum 3 characters')
        })

        it('should not show error when validation passes', () => {
            const validator = fieldValidator(
                z.string().min(3, 'Minimum 3 characters'),
            )
            render(<FieldText validator={validator} value="abc" />)

            const input = screen.getByRole('textbox')
            expect(input).toHaveAttribute('data-invalid', 'false')
        })

        it('should work without validator', () => {
            render(<FieldText value="test" />)

            const input = screen.getByRole('textbox')
            expect(input).toHaveAttribute('data-invalid', 'false')
        })
    })

    describe('Drag and Drop', () => {
        it('should configure useDroppable with correct ID', () => {
            render(<FieldText value="test" />)

            expect(mockUseDroppable).toHaveBeenCalledWith({
                id: 'field-text-drop-zone-test',
            })
        })

        it('should configure useDroppable with ID for empty value', () => {
            render(<FieldText value={undefined} />)

            expect(mockUseDroppable).toHaveBeenCalledWith({
                id: 'field-text-drop-zone-empty',
            })
        })

        it('should apply CSS classes when drag is active', () => {
            mockUseDroppable.mockReturnValue({
                setNodeRef: vi.fn() as any,
                isOver: true,
                active: null,
                node: null,
            } as any)

            render(<FieldText />)

            const container = screen.getByRole('textbox').closest('div')
            expect(container).toHaveClass('ring-2', 'ring-blue-500')
        })

        it('should apply CSS classes when dndIsOver is true', () => {
            mockUseDroppable.mockReturnValue({
                setNodeRef: vi.fn() as any,
                isOver: false,
                active: null,
                node: null,
            } as any)

            const { rerender } = render(<FieldText />)

            mockUseDroppable.mockReturnValue({
                setNodeRef: vi.fn() as any,
                isOver: true,
                active: null,
                node: null,
            } as any)

            rerender(<FieldText />)

            const container = screen.getByRole('textbox').closest('div')
            expect(container).toHaveClass('ring-2', 'ring-blue-500')
        })

        it('should apply border-blue-500 class on Input when drag is active', () => {
            mockUseDroppable.mockReturnValue({
                setNodeRef: vi.fn() as any,
                isOver: true,
                active: null,
                node: null,
            } as any)

            render(<FieldText />)

            const input = screen.getByRole('textbox')
            expect(input).toHaveClass('border-blue-500')
        })
    })

    describe('useDndMonitor', () => {
        it('should configure useDndMonitor', () => {
            render(<FieldText />)

            expect(mockUseDndMonitor).toHaveBeenCalledWith({
                onDragEnd: expect.any(Function),
            })
        })

        it('should process drop of valid item', () => {
            const onValueChange = vi.fn()
            render(
                <FieldText
                    value="current value"
                    onValueChange={onValueChange}
                />,
            )

            const onDragEndCallback =
                mockUseDndMonitor.mock.calls[0][0].onDragEnd

            if (onDragEndCallback) {
                onDragEndCallback({
                    active: {
                        id: 'test-item',
                        data: {
                            current: {
                                id: 'test-id',
                                type: 'string',
                            },
                        },
                        rect: {
                            width: 100,
                            height: 100,
                            top: 0,
                            left: 0,
                            right: 100,
                            bottom: 100,
                        },
                    } as any,
                    over: {
                        id: 'field-text-drop-zone-current value',
                        rect: {
                            width: 100,
                            height: 100,
                            top: 0,
                            left: 0,
                            right: 100,
                            bottom: 100,
                        },
                        disabled: false,
                        data: {},
                    } as any,
                    activatorEvent: {} as any,
                    collisions: [],
                    delta: { x: 0, y: 0 },
                } as any)

                expect(onValueChange).toHaveBeenCalledWith(
                    'current value<test-id>',
                )
            }
        })

        it('should not process drop of invalid item', () => {
            const onValueChange = vi.fn()
            render(
                <FieldText
                    value="current value"
                    onValueChange={onValueChange}
                />,
            )

            const onDragEndCallback =
                mockUseDndMonitor.mock.calls[0][0].onDragEnd

            if (onDragEndCallback) {
                onDragEndCallback({
                    active: {
                        id: 'test-item',
                        data: {
                            current: {
                                id: 'test-id',
                                type: 'invalid-type',
                            },
                        },
                        rect: {
                            width: 100,
                            height: 100,
                            top: 0,
                            left: 0,
                            right: 100,
                            bottom: 100,
                        },
                    } as any,
                    over: {
                        id: 'field-text-drop-zone-current value',
                        rect: {
                            width: 100,
                            height: 100,
                            top: 0,
                            left: 0,
                            right: 100,
                            bottom: 100,
                        },
                        disabled: false,
                        data: {},
                    } as any,
                    activatorEvent: {} as any,
                    collisions: [],
                    delta: { x: 0, y: 0 },
                } as any)

                expect(onValueChange).not.toHaveBeenCalled()
            }
        })

        it('should not process drop when over does not match', () => {
            const onValueChange = vi.fn()
            render(
                <FieldText
                    value="current value"
                    onValueChange={onValueChange}
                />,
            )

            const onDragEndCallback =
                mockUseDndMonitor.mock.calls[0][0].onDragEnd

            if (onDragEndCallback) {
                onDragEndCallback({
                    active: {
                        id: 'test-item',
                        data: {
                            current: {
                                id: 'test-id',
                                type: 'string',
                            },
                        },
                        rect: {
                            width: 100,
                            height: 100,
                            top: 0,
                            left: 0,
                            right: 100,
                            bottom: 100,
                        },
                    } as any,
                    over: {
                        id: 'other-drop-zone',
                        rect: {
                            width: 100,
                            height: 100,
                            top: 0,
                            left: 0,
                            right: 100,
                            bottom: 100,
                        },
                        disabled: false,
                        data: {},
                    } as any,
                    activatorEvent: {} as any,
                    collisions: [],
                    delta: { x: 0, y: 0 },
                } as any)

                expect(onValueChange).not.toHaveBeenCalled()
            }
        })
    })

    describe('Input props', () => {
        it('should pass size="md" to Input', () => {
            render(<FieldText />)

            const input = screen.getByRole('textbox')
            expect(input).toHaveAttribute('data-size', 'md')
        })

        it('should pass type="text" to Input', () => {
            render(<FieldText />)

            const input = screen.getByRole('textbox')
            expect(input).toHaveAttribute('data-type', 'text')
        })

        it('should pass additional InputProps', () => {
            render(<FieldText placeholder="Type here" maxLength={100} />)

            const input = screen.getByRole('textbox')
            expect(input).toHaveAttribute('placeholder', 'Type here')
            expect(input).toHaveAttribute('maxLength', '100')
        })
    })

    describe('PropertyContainer integration', () => {
        it('should render inside PropertyContainer', () => {
            render(<FieldText label="Test Field" />)

            const container = screen.getByTestId('property-container')
            const input = screen.getByRole('textbox')

            expect(container).toContainElement(input)
        })

        it('should pass label to PropertyContainer', () => {
            render(<FieldText label="Custom Label" />)

            const container = screen.getByTestId('property-container')
            expect(container).toHaveAttribute('data-label', 'Custom Label')
        })
    })
})
