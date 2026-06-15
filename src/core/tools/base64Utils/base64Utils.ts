/**
 * Extrai o tipo MIME de uma string base64
 * @param base64Data - String base64 com prefixo data:image/...
 * @returns O tipo MIME extraído ou null se não for válido
 */
export const extractMimeTypeFromBase64 = (
    base64Data: string,
): string | null => {
    // Verifica se é um data URL válido
    const dataUrlRegex = /^data:([^;]+);base64,/
    const match = base64Data.match(dataUrlRegex)

    if (match && match[1]) {
        return match[1]
    }

    return null
}

/**
 * Remove o prefixo data URL de uma string base64
 * @param base64Data - String base64 completa
 * @returns A string base64 sem o prefixo data URL
 */
export const removeDataUrlPrefix = (base64Data: string): string => {
    const dataUrlRegex = /^data:[^;]+;base64,/
    return base64Data.replace(dataUrlRegex, '')
}

/**
 * Valida se uma string é um base64 válido de imagem
 * @param base64Data - String base64 para validar
 * @returns true se for um base64 válido de imagem
 */
export const isValidImageBase64 = (base64Data: string): boolean => {
    const mimeType = extractMimeTypeFromBase64(base64Data)
    return mimeType?.startsWith('image/') || false
}
