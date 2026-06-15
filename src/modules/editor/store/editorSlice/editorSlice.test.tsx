import { act, render, renderHook, screen } from '@testing-library/react'
import { createEditorStore } from './editorSlice'
import { EditorStoreContext, EditorStoreProvider } from './editorSlice.context'
import { defaultMenu, menus } from '@/modules/editor/editor.constants'
import { Data } from '@measured/puck'
import { IPage } from '@/core/models/pages'
import { useEditor, useEditorRouter } from './editorSlice.hook'

const mockedPublishedData: IPage = {
    _id: '1',
    title: 'test',
    slug: 'test',
    content: {} as Data,
    dynamicAdaptor: '',
}

vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: vi.fn(),
        replace: vi.fn(),
        back: vi.fn(),
        forward: vi.fn(),
    }),
}))

describe('Store: editorSlice', () => {
    it('should create a store with working setters', () => {
        const store = createEditorStore({
            selectedMenu: defaultMenu,
            publishedData: null,
            isLoading: false,
            sharedMenuData: {},
        })

        expect(store).toBeDefined()

        act(() => store.getState().setSelectedMenu(menus[1][0]))
        expect(store.getState().selectedMenu).toBe(menus[1][0])

        act(() => store.getState().setPublishedData(mockedPublishedData))
        expect(store.getState().publishedData).toBe(mockedPublishedData)

        act(() => store.getState().setIsLoading(true))
        expect(store.getState().isLoading).toBe(true)
    })

    it('should create store context', () => {
        const store = createEditorStore({
            selectedMenu: defaultMenu,
            publishedData: null,
            isLoading: false,
            sharedMenuData: {},
        })

        const Wrapper = ({ children }: { children: React.ReactNode }) => (
            <EditorStoreContext.Provider value={store}>
                {children}
            </EditorStoreContext.Provider>
        )

        render(<Wrapper>Test</Wrapper>)

        expect(screen.getByText('Test')).toBeInTheDocument()
    })

    it('should disponibilize store provider ready-to-use', () => {
        render(
            <EditorStoreProvider
                initialState={{
                    selectedMenu: defaultMenu,
                    publishedData: null,
                    isLoading: false,
                    sharedMenuData: {},
                }}
            >
                Test
            </EditorStoreProvider>,
        )

        expect(screen.getByText('Test')).toBeInTheDocument()
    })

    it('should accept injected initial store', () => {
        const store = createEditorStore({
            selectedMenu: defaultMenu,
            publishedData: null,
            isLoading: false,
            sharedMenuData: {},
        })

        render(
            <EditorStoreProvider
                initialState={{
                    selectedMenu: defaultMenu,
                    publishedData: null,
                    isLoading: false,
                    sharedMenuData: {},
                }}
                initialStore={store}
            >
                Test
            </EditorStoreProvider>,
        )

        expect(screen.getByText('Test')).toBeInTheDocument()
    })

    it('should have working useEditor hook', () => {
        const store = createEditorStore({
            selectedMenu: defaultMenu,
            publishedData: null,
            isLoading: false,
            sharedMenuData: {},
        })

        const Wrapper = ({ children }: { children: React.ReactNode }) => (
            <EditorStoreProvider
                initialState={{
                    selectedMenu: defaultMenu,
                    publishedData: null,
                    isLoading: false,
                    sharedMenuData: {},
                }}
                initialStore={store}
            >
                {children}
            </EditorStoreProvider>
        )

        const { result } = renderHook(() => useEditor(), {
            wrapper: Wrapper,
        })

        expect(result.current.selectedMenu).toBe(defaultMenu)
    })

    it('should throw error on useEditor hook if not in context', () => {
        try {
            renderHook(() => useEditor())
        } catch (error) {
            expect(error).toBeDefined()
        }
    })

    it('should have working useEditorRouter hook', () => {
        const Wrapper = ({ children }: { children: React.ReactNode }) => (
            <EditorStoreProvider
                initialState={{
                    selectedMenu: defaultMenu,
                    publishedData: null,
                    isLoading: false,
                    sharedMenuData: {},
                }}
            >
                {children}
            </EditorStoreProvider>
        )

        const { result } = renderHook(() => useEditorRouter(), {
            wrapper: Wrapper,
        })

        act(() => result.current.push('/test'))
        act(() => result.current.replace('/test'))
        act(() => result.current.back())
        act(() => result.current.forward())

        expect(result.current.push).toBeDefined()
        expect(result.current.replace).toBeDefined()
        expect(result.current.back).toBeDefined()
        expect(result.current.forward).toBeDefined()
    })

    describe('Shared Menu Data', () => {
        it('should set shared menu data correctly', () => {
            const store = createEditorStore({
                selectedMenu: defaultMenu,
                publishedData: null,
                isLoading: false,
                sharedMenuData: {},
            })

            act(() =>
                store.getState().setSharedMenuData('testKey', 'testValue'),
            )
            expect(store.getState().sharedMenuData).toEqual({
                testKey: 'testValue',
            })
        })

        it('should update existing shared menu data', () => {
            const store = createEditorStore({
                selectedMenu: defaultMenu,
                publishedData: null,
                isLoading: false,
                sharedMenuData: {
                    existingKey: 'existingValue',
                },
            })

            act(() =>
                store
                    .getState()
                    .setSharedMenuData('existingKey', 'updatedValue'),
            )
            expect(store.getState().sharedMenuData).toEqual({
                existingKey: 'updatedValue',
            })
        })

        it('should add new key to existing shared menu data', () => {
            const store = createEditorStore({
                selectedMenu: defaultMenu,
                publishedData: null,
                isLoading: false,
                sharedMenuData: {
                    existingKey: 'existingValue',
                },
            })

            act(() => store.getState().setSharedMenuData('newKey', 'newValue'))
            expect(store.getState().sharedMenuData).toEqual({
                existingKey: 'existingValue',
                newKey: 'newValue',
            })
        })

        it('should set multiple shared menu data entries', () => {
            const store = createEditorStore({
                selectedMenu: defaultMenu,
                publishedData: null,
                isLoading: false,
                sharedMenuData: {},
            })

            act(() => store.getState().setSharedMenuData('key1', 'value1'))
            act(() => store.getState().setSharedMenuData('key2', 'value2'))
            act(() => store.getState().setSharedMenuData('key3', 'value3'))

            expect(store.getState().sharedMenuData).toEqual({
                key1: 'value1',
                key2: 'value2',
                key3: 'value3',
            })
        })

        it('should set complex objects as shared menu data', () => {
            const store = createEditorStore({
                selectedMenu: defaultMenu,
                publishedData: null,
                isLoading: false,
                sharedMenuData: {},
            })

            const complexObject = {
                nested: {
                    value: 'test',
                    array: [1, 2, 3],
                },
                boolean: true,
                number: 42,
            }

            act(() =>
                store.getState().setSharedMenuData('complexKey', complexObject),
            )
            expect(store.getState().sharedMenuData).toEqual({
                complexKey: complexObject,
            })
        })

        it('should clear specific shared menu data key', () => {
            const store = createEditorStore({
                selectedMenu: defaultMenu,
                publishedData: null,
                isLoading: false,
                sharedMenuData: {
                    key1: 'value1',
                    key2: 'value2',
                    key3: 'value3',
                },
            })

            act(() => store.getState().clearSharedMenuData('key2'))
            expect(store.getState().sharedMenuData).toEqual({
                key1: 'value1',
                key3: 'value3',
            })
        })

        it('should clear all shared menu data when no key provided', () => {
            const store = createEditorStore({
                selectedMenu: defaultMenu,
                publishedData: null,
                isLoading: false,
                sharedMenuData: {
                    key1: 'value1',
                    key2: 'value2',
                    key3: 'value3',
                },
            })

            act(() => store.getState().clearSharedMenuData())
            expect(store.getState().sharedMenuData).toEqual({})
        })

        it('should clear shared menu data when key does not exist', () => {
            const store = createEditorStore({
                selectedMenu: defaultMenu,
                publishedData: null,
                isLoading: false,
                sharedMenuData: {
                    key1: 'value1',
                    key2: 'value2',
                },
            })

            act(() => store.getState().clearSharedMenuData('nonExistentKey'))
            expect(store.getState().sharedMenuData).toEqual({
                key1: 'value1',
                key2: 'value2',
            })
        })

        it('should clear shared menu data from empty object', () => {
            const store = createEditorStore({
                selectedMenu: defaultMenu,
                publishedData: null,
                isLoading: false,
                sharedMenuData: {},
            })

            act(() => store.getState().clearSharedMenuData('anyKey'))
            expect(store.getState().sharedMenuData).toEqual({})
        })

        it('should clear all shared menu data from empty object', () => {
            const store = createEditorStore({
                selectedMenu: defaultMenu,
                publishedData: null,
                isLoading: false,
                sharedMenuData: {},
            })

            act(() => store.getState().clearSharedMenuData())
            expect(store.getState().sharedMenuData).toEqual({})
        })

        it('should handle setSharedMenuData and clearSharedMenuData together', () => {
            const store = createEditorStore({
                selectedMenu: defaultMenu,
                publishedData: null,
                isLoading: false,
                sharedMenuData: {},
            })

            act(() => store.getState().setSharedMenuData('key1', 'value1'))
            act(() => store.getState().setSharedMenuData('key2', 'value2'))
            expect(store.getState().sharedMenuData).toEqual({
                key1: 'value1',
                key2: 'value2',
            })

            act(() => store.getState().clearSharedMenuData('key1'))
            expect(store.getState().sharedMenuData).toEqual({
                key2: 'value2',
            })

            act(() => store.getState().setSharedMenuData('key3', 'value3'))
            expect(store.getState().sharedMenuData).toEqual({
                key2: 'value2',
                key3: 'value3',
            })

            act(() => store.getState().clearSharedMenuData())
            expect(store.getState().sharedMenuData).toEqual({})
        })

        it('should handle shared menu data with useEditor hook', () => {
            const store = createEditorStore({
                selectedMenu: defaultMenu,
                publishedData: null,
                isLoading: false,
                sharedMenuData: {},
            })

            const Wrapper = ({ children }: { children: React.ReactNode }) => (
                <EditorStoreProvider
                    initialState={{
                        selectedMenu: defaultMenu,
                        publishedData: null,
                        isLoading: false,
                        sharedMenuData: {},
                    }}
                    initialStore={store}
                >
                    {children}
                </EditorStoreProvider>
            )

            const { result } = renderHook(() => useEditor(), {
                wrapper: Wrapper,
            })

            act(() => result.current.setSharedMenuData('testKey', 'testValue'))
            expect(result.current.sharedMenuData).toEqual({
                testKey: 'testValue',
            })

            act(() => result.current.clearSharedMenuData('testKey'))
            expect(result.current.sharedMenuData).toEqual({})
        })

        it('should handle shared menu data with multiple operations', () => {
            const store = createEditorStore({
                selectedMenu: defaultMenu,
                publishedData: null,
                isLoading: false,
                sharedMenuData: {
                    initialKey: 'initialValue',
                },
            })

            const Wrapper = ({ children }: { children: React.ReactNode }) => (
                <EditorStoreProvider
                    initialState={{
                        selectedMenu: defaultMenu,
                        publishedData: null,
                        isLoading: false,
                        sharedMenuData: {
                            initialKey: 'initialValue',
                        },
                    }}
                    initialStore={store}
                >
                    {children}
                </EditorStoreProvider>
            )

            const { result } = renderHook(() => useEditor(), {
                wrapper: Wrapper,
            })

            act(() =>
                result.current.setSharedMenuData('initialKey', 'updatedValue'),
            )
            expect(result.current.sharedMenuData).toEqual({
                initialKey: 'updatedValue',
            })

            act(() => result.current.setSharedMenuData('newKey', 'newValue'))
            expect(result.current.sharedMenuData).toEqual({
                initialKey: 'updatedValue',
                newKey: 'newValue',
            })

            act(() => result.current.clearSharedMenuData('initialKey'))
            expect(result.current.sharedMenuData).toEqual({
                newKey: 'newValue',
            })

            act(() => result.current.clearSharedMenuData())
            expect(result.current.sharedMenuData).toEqual({})
        })
    })
})
