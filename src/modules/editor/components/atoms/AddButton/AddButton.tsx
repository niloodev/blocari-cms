import { Button } from '@heroui/react'
import { PlusIcon } from 'lucide-react'
import { AddButtonProps } from './AddButton.types'

export function AddButton({ ...props }: AddButtonProps) {
    return (
        <Button
            {...props}
            variant="flat"
            className={`rounded-[8px] w-[80px] min-h-[80px] flex flex-col justify-center align-center ${props.className}`}
            isIconOnly
        >
            <PlusIcon />
        </Button>
    )
}
