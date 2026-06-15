/**
 * Substitui o domínio da URL do S3 pelo CDN configurado
 * @param s3Url - URL do S3 (ex: https://bucket.s3.region.amazonaws.com/path)
 * @returns URL com o domínio do CDN
 */
export const replaceS3DomainWithCDN = (s3Url: string): string => {
    if (!s3Url) return s3Url

    const cdnDomain = process.env.NEXT_CDN_IMAGES
    if (!cdnDomain) {
        console.warn(
            'NEXT_CDN_IMAGES não configurado, usando URL original do S3',
        )
        return s3Url
    }

    try {
        const url = new URL(s3Url)

        // Extrai o path da URL do S3 (remove o domínio)
        const path = url.pathname

        // Constrói a nova URL com o CDN
        const cdnUrl = `${cdnDomain}${path}`

        return cdnUrl
    } catch (error) {
        console.error('Erro ao processar URL do S3:', error)
        return s3Url
    }
}

/**
 * Verifica se uma URL é do S3
 * @param url - URL para verificar
 * @returns true se for uma URL do S3
 */
export const isS3Url = (url: string): boolean => {
    if (!url) return false

    try {
        const urlObj = new URL(url)
        return (
            urlObj.hostname.includes('s3') &&
            urlObj.hostname.includes('amazonaws.com')
        )
    } catch {
        return false
    }
}

/**
 * Processa uma URL, substituindo o domínio do S3 pelo CDN se necessário
 * @param url - URL para processar
 * @returns URL processada
 */
export const processImageUrl = (url: string): string => {
    if (!url) return url

    if (isS3Url(url)) {
        return replaceS3DomainWithCDN(url)
    }

    return url
}

/**
 * Extrai o nome do arquivo de uma URL
 * @param url - URL para extrair o nome do arquivo
 * @returns Nome do arquivo ou 'image' como fallback
 */
export const extractFileNameFromUrl = (url: string): string => {
    if (!url) return 'image'

    try {
        const urlObj = new URL(url)
        const pathname = urlObj.pathname

        // Extrai o nome do arquivo do path
        const fileName = pathname.split('/').pop()

        if (fileName && fileName.includes('.')) {
            return fileName
        }

        // Se não conseguiu extrair, tenta pegar da query string
        const queryFileName = urlObj.searchParams.get('filename')
        if (queryFileName) {
            return queryFileName
        }

        return 'image'
    } catch {
        // Se não conseguir fazer parse da URL, tenta extrair do final da string
        const parts = url.split('/')
        const lastPart = parts[parts.length - 1]

        if (lastPart && lastPart.includes('.')) {
            return lastPart
        }

        return 'image'
    }
}

/**
 * Verifica se uma URL é uma imagem válida
 * @param url - URL para verificar
 * @returns true se for uma URL de imagem válida
 */
export const isValidImageUrl = (url: string): boolean => {
    if (!url) return false

    // Verifica se é uma URL HTTP/HTTPS
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        return false
    }

    // Verifica se tem extensão de imagem
    const imageExtensions = [
        '.jpg',
        '.jpeg',
        '.png',
        '.gif',
        '.webp',
        '.avif',
        '.svg',
    ]
    const hasImageExtension = imageExtensions.some(ext =>
        url.toLowerCase().includes(ext),
    )

    if (hasImageExtension) {
        return true
    }

    // Verifica se é um data URL de imagem
    if (url.startsWith('data:image/')) {
        return true
    }

    return false
}
