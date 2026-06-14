export interface BaseResponse<T> {
    message: string
    payload: T
}

export interface BaseError<T extends string> {
    error: T
}
