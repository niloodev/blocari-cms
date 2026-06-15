import { getImageData } from '@/core/models/images'
import { NextResponse } from 'next/server'

/**
 * Serve o binário de uma imagem armazenada no MongoDB.
 * Como é uma rota same-origin, o next/image consegue otimizá-la normalmente.
 */
export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params

    const image = await getImageData(id)
    if (!image) {
        return new NextResponse('Imagem não encontrada', { status: 404 })
    }

    const buffer = Buffer.from(image.data, 'base64')

    return new NextResponse(new Uint8Array(buffer), {
        headers: {
            'Content-Type': image.mimeType,
            'Cache-Control': 'public, max-age=31536000, immutable',
        },
    })
}
