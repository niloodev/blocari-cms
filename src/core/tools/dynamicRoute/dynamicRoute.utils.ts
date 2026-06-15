/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Converte um padrão de rota dinâmica em regex e extrai os nomes dos parâmetros
 *
 * @param pattern - Padrão da rota (ex: "/carros/<ID-CARRO>/<COR>")
 * @returns Objeto com regex compilado e array de nomes dos parâmetros
 *
 * @example
 * convertPatternToRegex("/carros/<ID-CARRO>")
 * // Retorna: { regex: /^\/carros\/([^\/]+)$/, paramNames: ["ID-CARRO"] }
 */
export const convertPatternToRegex = (
    pattern: string,
): { regex: RegExp; paramNames: string[] } => {
    const paramNames: string[] = []

    // Substitui cada <PARAMETRO> por um grupo de captura regex
    const regexPattern = pattern.replace(/<([A-Z-]+)>/g, (match, paramName) => {
        paramNames.push(paramName)
        return '([^/]+)' // Captura qualquer caractere exceto /
    })

    return {
        regex: new RegExp(`^${regexPattern}$`), // ^ e $ garantem match completo
        paramNames,
    }
}

/**
 * Extrai parâmetros dinâmicos de uma URL baseado em um padrão
 *
 * @param url - URL a ser analisada (ex: "/carros/123")
 * @param pattern - Padrão da rota (ex: "/carros/<ID-CARRO>")
 * @returns Objeto com os parâmetros extraídos ou null se não bater
 *
 * @example
 * extractDynamicParams("/carros/123", "/carros/<ID-CARRO>")
 * // Retorna: { "ID-CARRO": "123" }
 */
export const extractDynamicParams = (
    url: string,
    pattern: string,
): Record<string, string> | null => {
    const { regex, paramNames } = convertPatternToRegex(pattern)
    const match = url.match(regex)

    if (!match) return null

    // Extrai os valores capturados pelos grupos regex
    const params: Record<string, string> = {}
    paramNames.forEach((paramName, index) => {
        params[paramName] = match[index + 1] // +1 porque match[0] é a string completa
    })

    return params
}

/**
 * Processa recursivamente um valor, substituindo placeholders por valores reais
 *
 * @param value - Valor a ser processado (string, array, objeto, etc)
 * @param mappedElement - Objeto com os dados mapeados do adapter
 * @param availableFields - Array com os nomes dos campos disponíveis
 * @returns Valor processado com placeholders substituídos
 *
 * @example
 * processValueRecursively("Preço: <PRECO:currency>", { PRECO: 150000 }, ["PRECO"])
 * // Retorna: "Preço: R$ 150.000,00"
 */
export const processValueRecursively = (
    value: any,
    mappedElement: Record<string, any>,
    availableFields: string[],
): any => {
    // Se for string, procura por placeholders
    if (typeof value === 'string') {
        let processedValue = value

        // Procura por padrões como <CAMPO> ou <CAMPO:FORMATO>
        const placeholderRegex = /<([A-Z-]+)(?::([^>]+))?>/g
        processedValue = processedValue.replace(
            placeholderRegex,
            (match, fieldName, format) => {
                // Verifica se o campo existe no mappedElement
                if (
                    availableFields.includes(fieldName) &&
                    mappedElement[fieldName] !== undefined
                ) {
                    const fieldValue = mappedElement[fieldName]

                    // Se o valor for null ou undefined, retorna string vazia
                    if (fieldValue === null || fieldValue === undefined) {
                        return ''
                    }

                    // Verifica se o placeholder está sozinho na string (sem outros caracteres)
                    const isPlaceholderAlone = processedValue.trim() === match

                    // Se o valor for um array
                    if (Array.isArray(fieldValue)) {
                        // Se estiver dentro de uma frase, faz o join
                        if (format === 'join') {
                            return fieldValue.join(', ')
                        } else if (format === 'join-dash') {
                            return fieldValue.join(' - ')
                        } else if (format === 'count') {
                            return String(fieldValue.length)
                        } else if (format === 'first') {
                            return String(fieldValue[0] || '')
                        } else if (format === 'last') {
                            return String(
                                fieldValue[fieldValue.length - 1] || '',
                            )
                        } else {
                            // Por padrão, junta com vírgula
                            return fieldValue.join(',')
                        }
                    }

                    // Se o valor não for array, mas o placeholder estiver sozinho
                    if (isPlaceholderAlone) {
                        // Retorna o valor real (pode ser string, number, boolean, etc)
                        return fieldValue
                    }

                    // Aplica formatação se especificada
                    if (format) {
                        return applyFormatting(fieldValue, format)
                    }

                    return String(fieldValue)
                }

                // Se não encontrar, mantém o placeholder original
                return match
            },
        )

        return processedValue
    }

    // Se for array, processa cada elemento recursivamente
    if (Array.isArray(value)) {
        return value.map(item =>
            processValueRecursively(item, mappedElement, availableFields),
        )
    }

    // Se for objeto, processa cada propriedade recursivamente
    if (typeof value === 'object' && value !== null) {
        const processedObject: any = {}

        for (const [key, val] of Object.entries(value)) {
            processedObject[key] = processValueRecursively(
                val,
                mappedElement,
                availableFields,
            )
        }

        return processedObject
    }

    // Para outros tipos (number, boolean, etc), retorna como está
    return value
}

/**
 * Aplica formatação específica a um valor
 *
 * @param value - Valor a ser formatado
 * @param format - Tipo de formatação desejada
 * @returns String formatada
 *
 * @example
 * applyFormatting(150000, "currency") // "R$ 150.000,00"
 * applyFormatting("toyota", "uppercase") // "TOYOTA"
 * applyFormatting("corolla", "capitalize") // "Corolla"
 */
export const applyFormatting = (value: any, format: string): string => {
    const stringValue = String(value)

    switch (format) {
        case 'currency':
            // Formatação monetária brasileira
            return new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            }).format(Number(value))

        case 'number':
            // Formatação numérica brasileira (com pontos e vírgulas)
            return new Intl.NumberFormat('pt-BR').format(Number(value))

        case 'uppercase':
            // Converte para maiúsculas
            return stringValue.toUpperCase()

        case 'lowercase':
            // Converte para minúsculas
            return stringValue.toLowerCase()

        case 'capitalize':
            // Primeira letra maiúscula, resto minúscula
            return (
                stringValue.charAt(0).toUpperCase() +
                stringValue.slice(1).toLowerCase()
            )

        default:
            // Se não reconhecer o formato, retorna como string
            return stringValue
    }
}
