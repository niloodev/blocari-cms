import { adapters } from './adapters'

export function getUniqueFieldFromAdapter(adapterKey: string): string | null {
    const adapter = adapters[adapterKey as keyof typeof adapters]

    if (!adapter) {
        return null
    }

    const uniqueField = adapter.availableMappedFields.find(
        field => field.isUnique,
    )
    return uniqueField?.id || null
}

export function validateDynamicRoute(
    adapterKey: string,
    slug: string,
): boolean {
    const uniqueField = getUniqueFieldFromAdapter(adapterKey)

    if (!uniqueField) {
        return false
    }

    const expectedSegment = `<${uniqueField}>`
    return slug.includes(expectedSegment)
}
