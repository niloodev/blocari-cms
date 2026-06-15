import { act, render, renderHook, screen } from '@testing-library/react'
import { FieldArray } from './FieldArray'
import { FieldArrayValueItem } from './FieldArray.types'
import { useFieldArray } from './FieldArray.hook'
import { DragEndEvent } from '@dnd-kit/core'

vi.mock('./subcomponents', () => ({
    FieldArrayItem: ({ value }: { value: FieldArrayValueItem }) => (
        <div>{value.name}</div>
    ),
}))

vi.mock('uuid', () => ({
    v4: () => '123',
}))

describe('Fields: FieldArray', () => {
    it('should render FieldArrayItems correctly', () => {
        render(
            <FieldArray
                field={{
                    type: 'array',
                    arrayFields: { name: { type: 'text' } },
                }}
                value={[{ name: 'John Doe' }]}
                onChange={() => {}}
            />,
        )

        expect(screen.getByText('John Doe')).toBeInTheDocument()
    })

    it('should have working formattedValue on useFieldArray putting id in the items', () => {
        const { result } = renderHook(() =>
            useFieldArray({
                field: {
                    type: 'array',
                    arrayFields: { name: { type: 'text' } },
                },
                value: [{ name: 'John Doe' }],
                onChange: () => {},
            }),
        )

        expect(result.current.formattedValue).toEqual([
            { name: 'John Doe', id: '123' },
        ])
    })

    it('should have working handleFieldChange on useFieldArray', () => {
        const onChangeListener = vi.fn()

        const { result } = renderHook(() =>
            useFieldArray({
                field: {
                    type: 'array',
                    arrayFields: { name: { type: 'text' } },
                },
                value: [{ name: 'Jane Doe' }],
                onChange: onChangeListener,
            }),
        )

        const { handleFieldChange } = result.current

        act(() => {
            handleFieldChange({
                index: 0,
                key: 'name',
                newValue: 'John Doe',
                props: { name: 'Jane Doe' },
            })
        })

        expect(onChangeListener).toHaveBeenCalledWith([{ name: 'John Doe' }])
    })

    it('should have working handleAdd on useFieldArray putting id in the new item', () => {
        const onChangeListener = vi.fn()

        const { result } = renderHook(() =>
            useFieldArray({
                field: {
                    type: 'array',
                    arrayFields: { name: { type: 'text' } },
                },
                value: [{ name: 'Jane Doe' }],
                onChange: onChangeListener,
            }),
        )

        const { handleAdd } = result.current

        act(() => {
            handleAdd()
        })

        expect(onChangeListener).toHaveBeenCalledWith([
            { name: 'Jane Doe' },
            { id: '123' },
        ])
    })

    it('should have working handleRemove on useFieldArray', () => {
        const onChangeListener = vi.fn()

        const { result } = renderHook(() =>
            useFieldArray({
                field: {
                    type: 'array',
                    arrayFields: { name: { type: 'text' } },
                },
                value: [{ name: 'Jane Doe' }, { name: 'John Doe' }],
                onChange: onChangeListener,
            }),
        )

        const { handleRemove } = result.current

        act(() => {
            handleRemove(0)
        })

        expect(onChangeListener).toHaveBeenCalledWith([{ name: 'John Doe' }])
    })

    it('should have working handleDragEnd on useFieldArray swapping items', () => {
        const onChangeListener = vi.fn()

        const { result } = renderHook(() =>
            useFieldArray({
                field: {
                    type: 'array',
                    arrayFields: { name: { type: 'text' } },
                },
                value: [
                    { name: 'Jane Doe', id: '123' },
                    { name: 'John Doe', id: '456' },
                ],
                onChange: onChangeListener,
            }),
        )

        const { handleDragEnd } = result.current

        act(() => {
            handleDragEnd({
                active: { id: '123' },
                over: { id: '456' },
            } as DragEndEvent)
        })

        expect(onChangeListener).toHaveBeenCalledWith([
            { name: 'John Doe', id: '456' },
            { name: 'Jane Doe', id: '123' },
        ])
    })

    it('should fallback value if no value is provided', () => {
        const { result } = renderHook(() =>
            useFieldArray({
                field: {
                    type: 'array',
                    arrayFields: { name: { type: 'text' } },
                },
                value: undefined,
                onChange: () => {},
            }),
        )

        expect(result.current.formattedValue).toEqual([])
    })

    it('should fallback value on handleAdd if no value is provided', () => {
        const onChangeListener = vi.fn()

        const { result } = renderHook(() =>
            useFieldArray({
                field: {
                    type: 'array',
                    arrayFields: { name: { type: 'text' } },
                },
                value: undefined,
                onChange: onChangeListener,
            }),
        )

        const { handleAdd } = result.current

        act(() => {
            handleAdd()
        })

        expect(onChangeListener).toHaveBeenCalledWith([{ id: '123' }])
    })

    it('should fallback value on handleRemove if no value is provided', () => {
        const onChangeListener = vi.fn()

        const { result } = renderHook(() =>
            useFieldArray({
                field: {
                    type: 'array',
                    arrayFields: { name: { type: 'text' } },
                },
                value: undefined,
                onChange: onChangeListener,
            }),
        )

        const { handleRemove } = result.current

        act(() => {
            handleRemove(0)
        })

        expect(onChangeListener).toHaveBeenCalledWith([])
    })

    it('should fallback value on handleFieldChange if no value is provided', () => {
        const onChangeListener = vi.fn()

        const { result } = renderHook(() =>
            useFieldArray({
                field: {
                    type: 'array',
                    arrayFields: { name: { type: 'text' } },
                },
                value: undefined,
                onChange: onChangeListener,
            }),
        )

        const { handleFieldChange } = result.current

        act(() => {
            handleFieldChange({
                index: 0,
                key: 'name',
                newValue: 'John Doe',
                props: { name: 'Jane Doe' },
            })
        })

        expect(onChangeListener).toHaveBeenCalledWith([{ name: 'John Doe' }])
    })

    it('should not swap items if they are the same', () => {
        const onChangeListener = vi.fn()

        const { result } = renderHook(() =>
            useFieldArray({
                field: {
                    type: 'array',
                    arrayFields: { name: { type: 'text' } },
                },
                value: [{ id: '123' }],
                onChange: onChangeListener,
            }),
        )

        const { handleDragEnd } = result.current

        act(() => {
            handleDragEnd({
                active: { id: '123' },
                over: { id: '123' },
            } as DragEndEvent)
        })

        expect(result.current.formattedValue).toStrictEqual([{ id: '123' }])
    })
})
