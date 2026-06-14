export type Types = 'standalone' | 'api'

export interface ITypeSwitcherProps<T> {
    switch: {
        [key in Types]: T
    }
}
