import { PuckComponentProps } from './setupFields.types'

export const defaultPuckContext: PuckComponentProps = {
    puck: {
        renderDropZone: () => null,
        isEditing: false,
        dragRef: null,
    },
}
