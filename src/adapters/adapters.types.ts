export type MappedElement = {
    [key: string]:
        | string
        | number
        | boolean
        | null
        | undefined
        | Array<string | number | boolean | null | undefined>
}

export type AdapterFieldTypes = 'string' | 'number' | 'boolean' | 'array'

export type Adapter<T> = {
    adapterName: string
    getAllMappedElements: () => Promise<MappedElement[]>
    getMappedElementByMappedId: (
        mappedId: string,
    ) => Promise<MappedElement | null>
    convertRawElementToMappedElement: (rawElement: T) => MappedElement
    availableMappedFields: {
        id: string
        label: string
        isUnique: boolean
        type: AdapterFieldTypes
    }[]
}
