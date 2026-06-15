import { act, renderHook, waitFor } from '@testing-library/react'
import { usePageMutation } from './usePageMutation'
import { useEditor, useEditorRouter } from '@/modules/editor/store'
import { EditorStore } from '@/modules/editor/store/editorSlice/editorSlice.types'
import { Data } from '@measured/puck'
import { createPage, updatePage, deletePage } from '@/core/controllers/pages'
import { addToast } from '@/shared/libs/heroui'
import { pageSchema } from '@/core/models/pages/pages.schemas'

vi.mock('@/modules/editor/store', () => ({
    useEditor: vi.fn(),
    useEditorRouter: vi.fn(),
}))

vi.mock('@/core/controllers/pages', () => ({
    createPage: vi.fn(),
    updatePage: vi.fn(),
    deletePage: vi.fn(),
}))

vi.mock('@/shared/libs/heroui', () => ({
    ...vi.importActual('@/shared/libs/heroui'),
    addToast: vi.fn(),
}))

vi.mock('@/core/models/pages/pages.schemas', async importOriginal => {
    const actual =
        await importOriginal<
            typeof import('@/core/models/pages/pages.schemas')
        >()

    return {
        ...actual,
        pageSchema: {
            safeParse: vi.fn().mockReturnValue({ success: true }),
        },
    }
})

beforeEach(() => {
    vi.clearAllMocks()

    vi.mocked(useEditor).mockReturnValue({
        setPublishedData: vi.fn(),
    } as unknown as EditorStore)

    vi.mocked(useEditorRouter).mockReturnValue({
        replace: vi.fn(),
    } as unknown as ReturnType<typeof useEditorRouter>)

    vi.mocked(createPage).mockImplementation(
        ({ _id = '' }: { _id?: string }) =>
            _id === '1'
                ? Promise.resolve({
                      status: 'success',
                      payload: {
                          _id: _id,
                          title: 'Test',
                          slug: '/test',
                          content: {} as Data,
                          dynamicAdaptor: '' as const,
                          description: 'Test',
                          canonical: 'https://www.google.com',
                          opengraphImage: 'https://www.google.com',
                      },
                      message: 'success',
                  })
                : Promise.resolve({
                      status: 'error',
                      error: 'Dados da página inválidos',
                  }),
    )

    vi.mocked(updatePage).mockImplementation(
        ({ _id = '' }: { _id?: string }) =>
            _id === '1'
                ? Promise.resolve({
                      status: 'success',
                      payload: {
                          _id: _id,
                          title: 'Test',
                          slug: '/test',
                          content: {} as Data,
                          dynamicAdaptor: '' as const,
                          description: 'Test',
                          canonical: 'https://www.google.com',
                          opengraphImage: 'https://www.google.com',
                      },
                      message: 'success',
                  })
                : Promise.resolve({
                      status: 'error',
                      error: 'Dados da página inválidos',
                  }),
    )

    vi.mocked(deletePage).mockImplementation(
        (id: Parameters<typeof deletePage>[0]) =>
            id === '1'
                ? Promise.resolve({
                      status: 'success',
                      payload: {
                          _id: id,
                          title: 'Test',
                          slug: '/test',
                          content: {} as Data,
                          dynamicAdaptor: '' as const,
                          description: 'Test',
                          canonical: 'https://www.google.com',
                          opengraphImage: 'https://www.google.com',
                      },
                      message: 'success',
                  })
                : Promise.resolve({
                      status: 'error',
                      error: 'Dados da página inválidos',
                  }),
    )

    vi.mocked(pageSchema.safeParse).mockReturnValue({
        success: true,
    } as ReturnType<typeof pageSchema.safeParse>)
})

describe('Hooks: usePageMutation', () => {
    it('should return mutate and isLoading', () => {
        const { result } = renderHook(() =>
            usePageMutation({ mutationType: 'create' }),
        )

        expect(result.current.mutate).toBeDefined()
        expect(result.current.isLoading).toBeDefined()
    })

    it('should call createPage when mutationType is create', async () => {
        const { result } = renderHook(() =>
            usePageMutation({ mutationType: 'create' }),
        )

        act(() => {
            result.current.mutate({
                id: '1',
                data: {
                    root: {
                        props: {
                            title: 'Test',
                        },
                    },
                    content: {},
                } as Data,
            })
        })

        expect(result.current.isLoading).toBe(true)

        await waitFor(() => expect(createPage).toHaveBeenCalled())
        await waitFor(() => expect(result.current.isLoading).toBe(false))
        await waitFor(() => expect(addToast).toHaveBeenCalled())
        await waitFor(() =>
            expect(useEditorRouter().replace).toHaveBeenCalledWith(
                '/admin/editor?id=1',
            ),
        )
        await waitFor(() =>
            expect(useEditor().setPublishedData).toHaveBeenCalledWith({
                _id: '1',
                title: 'Test',
                slug: '/test',
                content: {} as Data,
                description: 'Test',
                canonical: 'https://www.google.com',
                opengraphImage: 'https://www.google.com',
                dynamicAdaptor: '' as const,
            }),
        )
    })

    it('should call updatePage when mutationType is update', async () => {
        const { result } = renderHook(() =>
            usePageMutation({ mutationType: 'update' }),
        )

        act(() => {
            result.current.mutate({
                id: '1',
                data: {
                    root: { props: { title: 'Test' } },
                    content: {},
                } as Data,
            })
        })

        expect(result.current.isLoading).toBe(true)

        await waitFor(() => expect(updatePage).toHaveBeenCalled())
        await waitFor(() => expect(result.current.isLoading).toBe(false))
        await waitFor(() => expect(addToast).toHaveBeenCalled())
        await waitFor(() =>
            expect(useEditor().setPublishedData).toHaveBeenCalledWith({
                _id: '1',
                title: 'Test',
                slug: '/test',
                content: {} as Data,
                description: 'Test',
                canonical: 'https://www.google.com',
                opengraphImage: 'https://www.google.com',
                dynamicAdaptor: '' as const,
            }),
        )
    })

    it('should call deletePage when mutationType is delete', async () => {
        const { result } = renderHook(() =>
            usePageMutation({ mutationType: 'delete' }),
        )

        act(() => {
            result.current.mutate({
                id: '1',
                data: {
                    root: { props: { title: 'Test' } },
                    content: {},
                } as Data,
            })
        })

        expect(result.current.isLoading).toBe(true)

        await waitFor(() => expect(deletePage).toHaveBeenCalled())
        await waitFor(() => expect(result.current.isLoading).toBe(false))
        await waitFor(() => expect(addToast).toHaveBeenCalled())
        await waitFor(() =>
            expect(useEditorRouter().replace).toHaveBeenCalledWith(
                '/admin/editor',
            ),
        )
        await waitFor(() =>
            expect(useEditor().setPublishedData).toHaveBeenCalledWith({
                _id: undefined,
                title: '',
                slug: '',
                content: {} as Data,
                description: '',
                canonical: '',
                opengraphImage: '',
                dynamicAdaptor: '' as const,
            }),
        )
    })

    it('should call addToast with error when schema validation fails', async () => {
        vi.mocked(pageSchema.safeParse).mockReturnValue({
            success: false,
        } as ReturnType<typeof pageSchema.safeParse>)

        const { result } = renderHook(() =>
            usePageMutation({ mutationType: 'create' }),
        )

        act(() => {
            result.current.mutate({
                data: {
                    root: { props: { title: 'Test' } },
                } as Data,
            })
        })

        await waitFor(() => expect(addToast).toHaveBeenCalled())
    })

    it('should call addToast with error when createPage fails', async () => {
        const { result } = renderHook(() =>
            usePageMutation({ mutationType: 'create' }),
        )

        act(() => {
            result.current.mutate({
                id: '2',
                data: {
                    root: { props: { title: 'Test' } },
                } as Data,
            })
        })

        await waitFor(() => expect(addToast).toHaveBeenCalled())
    })

    it('should call addToast with error when updatePage fails', async () => {
        const { result } = renderHook(() =>
            usePageMutation({ mutationType: 'update' }),
        )

        act(() => {
            result.current.mutate({
                id: '2',
                data: { root: { props: { title: 'Test' } } } as Data,
            })
        })

        await waitFor(() => expect(addToast).toHaveBeenCalled())
    })

    it('should call addToast with error when deletePage fails', async () => {
        const { result } = renderHook(() =>
            usePageMutation({ mutationType: 'delete' }),
        )

        act(() => {
            result.current.mutate({
                data: { root: { props: { title: 'Test' } } } as Data,
            })
        })

        await waitFor(() => expect(addToast).toHaveBeenCalled())
    })

    it('should handle undefined or null title in root.props', async () => {
        const { result } = renderHook(() =>
            usePageMutation({ mutationType: 'create' }),
        )

        act(() => {
            result.current.mutate({
                id: '1',
                data: {
                    root: {
                        props: {
                            // title is undefined
                        },
                    },
                    content: {},
                } as Data,
            })
        })

        await waitFor(() =>
            expect(createPage).toHaveBeenCalledWith({
                _id: '1',
                title: '', // Should fallback to empty string
                slug: '',
                dynamicAdaptor: '',
                content: {
                    root: {
                        props: {
                            // title is undefined
                        },
                    },
                    content: {},
                },
                description: '',
                canonical: '',
                opengraphImage: '',
            }),
        )
    })

    it('should handle null title in root.props', async () => {
        const { result } = renderHook(() =>
            usePageMutation({ mutationType: 'create' }),
        )

        act(() => {
            result.current.mutate({
                id: '1',
                data: {
                    root: {
                        props: {
                            title: null,
                        },
                    },
                    content: {},
                } as unknown as Data,
            })
        })

        await waitFor(() =>
            expect(createPage).toHaveBeenCalledWith({
                _id: '1',
                title: '', // Should fallback to empty string
                slug: '',
                dynamicAdaptor: '',
                content: {
                    root: {
                        props: {
                            title: null,
                        },
                    },
                    content: {},
                } as unknown as Data,
                description: '',
                canonical: '',
                opengraphImage: '',
            }),
        )
    })
})
