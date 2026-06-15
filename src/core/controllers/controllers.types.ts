export interface BaseResponse<T> {
    status: 'success'
    message: string
    payload: T
}

export interface BaseError<T> {
    status: 'error'
    error: T
}
