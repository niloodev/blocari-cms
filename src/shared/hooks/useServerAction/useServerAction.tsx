import { useState, useEffect } from 'react'

export function useServerAction<T>(action: () => Promise<T>) {
    const [data, setData] = useState<T | null>(null)

    useEffect(() => {
        action().then(setData)
    }, [action])

    return data
}
