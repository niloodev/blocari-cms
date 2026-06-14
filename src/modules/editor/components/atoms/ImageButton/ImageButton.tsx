import { Button } from '@heroui/react'
import Image from 'next/image'
import { ImageButtonProps } from './ImageButton.types'

export function ImageButton({
    name,
    image,
    selected,
    onPress,
}: ImageButtonProps) {
    return (
        <Button
            className="rounded-[8px] w-[80px] bg-[none] h-[fit-content] flex flex-col justify-center !gap-[4px]"
            isIconOnly
            onPress={onPress}
        >
            <Image
                src={image}
                alt="Página"
                className={`object-cover rounded-[8px] w-[80px] h-[80px] ${selected ? 'rounded-[8px] border-[#006FEE] border-solid border-[2px]' : ''}`}
            />
            <span className="overflow-ellipsis overflow-hidden whitespace-nowrap w-[70px] text-[12px] leading-[120%]">
                {name}
            </span>
        </Button>
    )
}
