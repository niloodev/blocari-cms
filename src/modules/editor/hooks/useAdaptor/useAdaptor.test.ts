import { renderHook } from '@testing-library/react'
import { useAdaptor } from './useAdaptor'

vi.mock('@/adapters', () => ({
    adapters: {
        amazonasCars: {
            adapterName: 'Carros do Amazonas',
            availableMappedFields: [
                {
                    id: 'ID-CARRO',
                    label: 'ID do Carro',
                    isUnique: true,
                    type: 'string',
                },
                {
                    id: 'NOME-CARRO',
                    label: 'Nome do Carro',
                    isUnique: false,
                    type: 'string',
                },
                {
                    id: 'MARCA',
                    label: 'Marca',
                    isUnique: false,
                    type: 'string',
                },
            ],
            getAllMappedElements: vi.fn(),
            getMappedElementByMappedId: vi.fn(),
            convertRawElementToMappedElement: vi.fn(),
        },
    },
}))

vi.mock('@measured/puck', () => ({
    usePuck: vi.fn(),
}))

import { usePuck } from '@measured/puck'

const mockUsePuck = usePuck as ReturnType<typeof vi.fn>

describe('useAdaptor', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('hasDynamicAdapter', () => {
        it('should return false when dynamicAdaptor is empty string', () => {
            mockUsePuck.mockReturnValue({
                appState: {
                    data: {
                        root: {
                            props: {
                                dynamicAdaptor: '',
                            },
                        },
                    },
                },
            })

            const { result } = renderHook(() => useAdaptor())
            expect(result.current.hasDynamicAdapter).toBe(false)
        })

        it('should return false when dynamicAdaptor is null', () => {
            mockUsePuck.mockReturnValue({
                appState: {
                    data: {
                        root: {
                            props: {
                                dynamicAdaptor: null,
                            },
                        },
                    },
                },
            })

            const { result } = renderHook(() => useAdaptor())
            expect(result.current.hasDynamicAdapter).toBe(false)
        })

        it('should return false when dynamicAdaptor is undefined', () => {
            mockUsePuck.mockReturnValue({
                appState: {
                    data: {
                        root: {
                            props: {
                                dynamicAdaptor: undefined,
                            },
                        },
                    },
                },
            })

            const { result } = renderHook(() => useAdaptor())
            expect(result.current.hasDynamicAdapter).toBe(false)
        })

        it('should return true when dynamicAdaptor has a valid value', () => {
            mockUsePuck.mockReturnValue({
                appState: {
                    data: {
                        root: {
                            props: {
                                dynamicAdaptor: 'amazonasCars',
                            },
                        },
                    },
                },
            })

            const { result } = renderHook(() => useAdaptor())
            expect(result.current.hasDynamicAdapter).toBe(true)
        })

        it('should return true when dynamicAdaptor has a non-empty string', () => {
            mockUsePuck.mockReturnValue({
                appState: {
                    data: {
                        root: {
                            props: {
                                dynamicAdaptor: 'someAdapter',
                            },
                        },
                    },
                },
            })

            const { result } = renderHook(() => useAdaptor())
            expect(result.current.hasDynamicAdapter).toBe(true)
        })
    })

    describe('currentAdapter', () => {
        it('should return null when dynamicAdaptor is empty', () => {
            mockUsePuck.mockReturnValue({
                appState: {
                    data: {
                        root: {
                            props: {
                                dynamicAdaptor: '',
                            },
                        },
                    },
                },
            })

            const { result } = renderHook(() => useAdaptor())
            expect(result.current.currentAdapter).toBe(null)
        })

        it('should return null when dynamicAdaptor is null', () => {
            mockUsePuck.mockReturnValue({
                appState: {
                    data: {
                        root: {
                            props: {
                                dynamicAdaptor: null,
                            },
                        },
                    },
                },
            })

            const { result } = renderHook(() => useAdaptor())
            expect(result.current.currentAdapter).toBe(null)
        })

        it('should return null when dynamicAdaptor is undefined', () => {
            mockUsePuck.mockReturnValue({
                appState: {
                    data: {
                        root: {
                            props: {
                                dynamicAdaptor: undefined,
                            },
                        },
                    },
                },
            })

            const { result } = renderHook(() => useAdaptor())
            expect(result.current.currentAdapter).toBe(null)
        })

        it('should return null when dynamicAdaptor does not exist in adapters', () => {
            mockUsePuck.mockReturnValue({
                appState: {
                    data: {
                        root: {
                            props: {
                                dynamicAdaptor: 'nonExistentAdapter',
                            },
                        },
                    },
                },
            })

            const { result } = renderHook(() => useAdaptor())
            expect(result.current.currentAdapter).toBe(null)
        })

        it('should return the adapter when dynamicAdaptor exists in adapters', () => {
            mockUsePuck.mockReturnValue({
                appState: {
                    data: {
                        root: {
                            props: {
                                dynamicAdaptor: 'amazonasCars',
                            },
                        },
                    },
                },
            })

            const { result } = renderHook(() => useAdaptor())
            expect(result.current.currentAdapter).toBeTruthy()
            expect(result.current.currentAdapter?.adapterName).toBe(
                'Carros do Amazonas',
            )
        })

        it('should return null when appState.data is undefined', () => {
            mockUsePuck.mockReturnValue({
                appState: {
                    data: undefined,
                },
            })

            const { result } = renderHook(() => useAdaptor())
            expect(result.current.currentAdapter).toBe(null)
        })

        it('should return null when appState.data.root is undefined', () => {
            mockUsePuck.mockReturnValue({
                appState: {
                    data: {
                        root: undefined,
                    },
                },
            })

            const { result } = renderHook(() => useAdaptor())
            expect(result.current.currentAdapter).toBe(null)
        })

        it('should return null when appState.data.root.props is undefined', () => {
            mockUsePuck.mockReturnValue({
                appState: {
                    data: {
                        root: {
                            props: undefined,
                        },
                    },
                },
            })

            const { result } = renderHook(() => useAdaptor())
            expect(result.current.currentAdapter).toBe(null)
        })
    })

    describe('mappedFields', () => {
        it('should return empty array when currentAdapter is null', () => {
            mockUsePuck.mockReturnValue({
                appState: {
                    data: {
                        root: {
                            props: {
                                dynamicAdaptor: '',
                            },
                        },
                    },
                },
            })

            const { result } = renderHook(() => useAdaptor())
            expect(result.current.mappedFields).toEqual([])
        })

        it('should return adapter availableMappedFields when currentAdapter exists', () => {
            mockUsePuck.mockReturnValue({
                appState: {
                    data: {
                        root: {
                            props: {
                                dynamicAdaptor: 'amazonasCars',
                            },
                        },
                    },
                },
            })

            const { result } = renderHook(() => useAdaptor())
            expect(result.current.mappedFields).toHaveLength(3)
            expect(result.current.mappedFields[0].id).toBe('ID-CARRO')
            expect(result.current.mappedFields[1].id).toBe('NOME-CARRO')
            expect(result.current.mappedFields[2].id).toBe('MARCA')
        })
    })

    describe('returned object structure', () => {
        it('should return object with correct properties', () => {
            mockUsePuck.mockReturnValue({
                appState: {
                    data: {
                        root: {
                            props: {
                                dynamicAdaptor: 'amazonasCars',
                            },
                        },
                    },
                },
            })

            const { result } = renderHook(() => useAdaptor())

            expect(result.current).toHaveProperty('currentAdapter')
            expect(result.current).toHaveProperty('hasDynamicAdapter')
            expect(result.current).toHaveProperty('mappedFields')
        })

        it('should return correct values for all properties when adapter exists', () => {
            mockUsePuck.mockReturnValue({
                appState: {
                    data: {
                        root: {
                            props: {
                                dynamicAdaptor: 'amazonasCars',
                            },
                        },
                    },
                },
            })

            const { result } = renderHook(() => useAdaptor())

            expect(result.current.currentAdapter).toBeTruthy()
            expect(result.current.hasDynamicAdapter).toBe(true)
            expect(result.current.mappedFields).toHaveLength(3)
        })

        it('should return correct values for all properties when adapter does not exist', () => {
            mockUsePuck.mockReturnValue({
                appState: {
                    data: {
                        root: {
                            props: {
                                dynamicAdaptor: '',
                            },
                        },
                    },
                },
            })

            const { result } = renderHook(() => useAdaptor())

            expect(result.current.currentAdapter).toBe(null)
            expect(result.current.hasDynamicAdapter).toBe(false)
            expect(result.current.mappedFields).toEqual([])
        })
    })

    describe('edge cases', () => {
        it('should handle appState being null', () => {
            mockUsePuck.mockReturnValue({ appState: null })

            const { result } = renderHook(() => useAdaptor())

            expect(result.current.currentAdapter).toBe(null)
            expect(result.current.hasDynamicAdapter).toBe(false)
            expect(result.current.mappedFields).toEqual([])
        })

        it('should handle appState being undefined', () => {
            mockUsePuck.mockReturnValue({ appState: undefined })

            const { result } = renderHook(() => useAdaptor())

            expect(result.current.currentAdapter).toBe(null)
            expect(result.current.hasDynamicAdapter).toBe(false)
            expect(result.current.mappedFields).toEqual([])
        })

        it('should handle deep nested undefined values', () => {
            mockUsePuck.mockReturnValue({
                appState: {
                    data: {
                        root: {
                            props: {
                                dynamicAdaptor: undefined,
                            },
                        },
                    },
                },
            })

            const { result } = renderHook(() => useAdaptor())

            expect(result.current.currentAdapter).toBe(null)
            expect(result.current.hasDynamicAdapter).toBe(false)
            expect(result.current.mappedFields).toEqual([])
        })
    })
})
