import Image from 'next/image'
import codakoLogo from '@/shared/assets/img/codako-logo.svg'

export default function Loading() {
    return (
        <div className="min-w-[100vw] min-h-[100vh] flex flex-col justify-center items-center gap-4 bg-gray-100">
            <Image
                src={codakoLogo}
                alt="Codako Logo"
                width={102}
                height={110}
                priority
                className="animate-bounce w-12 h-12"
            />
            <p className="text-lg font-[500] text-gray-900font-poppins">
                Estamos preparando o editor para você...
            </p>
        </div>
    )
}
