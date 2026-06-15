import { Data } from '@measured/puck'

export interface UsePageMutationProps {
    mutationType: 'create' | 'update' | 'delete'
}

export interface MutateProps {
    id?: string
    data: Data
}
