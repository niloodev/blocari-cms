import { Button } from '@heroui/react'

export function DeleteButton() {
    return (
        <Button
            className="text-[12px] leading-[16px] w-full bg-white"
            color="danger"
            variant="light"
            size="sm"
            isDisabled
        >
            Deletar
        </Button>
    )
}
