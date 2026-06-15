import { useDisclosure } from '@/shared/libs/heroui'
import { useAdaptor } from '@/modules/editor/hooks'

export function useDynamicRouteHelper() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const { hasDynamicAdapter, mappedFields, currentAdapter } = useAdaptor()

    return {
        hasDynamicAdapter,
        currentAdapter,
        mappedFields,
        isOpen,
        onOpen,
        onOpenChange,
    }
}
