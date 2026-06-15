import { render, renderHook, screen } from '@testing-library/react'
import { FieldSelect } from './FieldSelect'
import { useFieldSelect } from './FieldSelect.hook'
import { act } from 'react'
import { SharedSelection } from '@/shared/libs/heroui'

const mockItems = [
    {
        key: '1',
        label: 'Item 1',
    },
    {
        key: '2',
        label: 'Item 2',
    },
]

describe('Fields: FieldSelect', () => {
    it('should render correctly', () => {
        render(<FieldSelect items={mockItems} />)

        expect(screen.getByText('Item 1')).toBeInTheDocument()
        expect(screen.getByText('Item 2')).toBeInTheDocument()
    })

    it('should change item when triggering handleSelectionChange', () => {
        const onSelectionChange = vi.fn()

        const { result } = renderHook(() =>
            useFieldSelect({
                items: mockItems,
                value: '1',
                onSelectionChange,
            }),
        )

        act(() => {
            result.current.handleSelectionChange({
                currentKey: '2',
                anchorKey: '1',
            } as SharedSelection)
        })

        expect(onSelectionChange).toHaveBeenCalledWith({
            currentKey: '2',
            anchorKey: '1',
        } as SharedSelection)
    })

    it('should not throw error if onSelectionChange is not provided', () => {
        const onSelectionChange = vi.fn()

        const { result } = renderHook(() =>
            useFieldSelect({
                items: mockItems,
                value: '1',
            }),
        )

        act(() => {
            result.current.handleSelectionChange({
                anchorKey: '1',
            } as SharedSelection)
        })

        expect(onSelectionChange).not.toHaveBeenCalled()
    })
})
