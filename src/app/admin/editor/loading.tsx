import Image from 'next/image'
import blocariLogo from '@/shared/assets/img/blocari-logo.svg'

export default function Loading() {
    return (
        <div className="min-w-[100vw] min-h-[100vh] flex flex-col justify-center items-center gap-4 bg-background">
            <Image
                src={blocariLogo}
                alt="Blocari Logo"
                width={102}
                height={110}
                priority
                className="animate-bounce w-12 h-12"
            />
            <p className="text-lg font-[500] text-foreground font-poppins">
                Estamos preparando o editor para você...
            </p>
        </div>
    )
}
