import { Button } from '@/shared/libs/heroui'
import { ImageButtonProps } from './ImageButton.types'
import Image from 'next/image'

export function ImageButton({
    name,
    image,
    selected,
    onPress,
}: ImageButtonProps) {
    return (
        <Button
            className="rounded-[8px] w-[80px] bg-[none] h-[fit-content] flex flex-col justify-center align-center !gap-[4px]"
            isIconOnly
            onPress={onPress}
            isDisabled={selected}
            aria-label={name}
        >
            <Image
                src={image.src}
                width={image.width}
                height={image.height}
                alt={name}
                className={`object-cover rounded-[8px] w-[80px] h-[80px] ${selected ? 'rounded-[8px] border-primary-300 border-solid border-[2px]' : ''}`}
            />
            <span className="overflow-ellipsis overflow-hidden whitespace-nowrap w-[70px] text-[12px] text-center leading-[120%]">
                {name}
            </span>
        </Button>
    )
}
