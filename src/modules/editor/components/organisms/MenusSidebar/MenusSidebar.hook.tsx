import { useEditor } from '@/modules/editor/store'
import * as menusModules from '@/modules/editor/menus'
import { useMemo } from 'react'

export function useMenusSidebar() {
    const { selectedMenu } = useEditor()

    const Menu = useMemo(() => {
        if (selectedMenu?.menu) return menusModules[selectedMenu.menu]
        return () => <></>
    }, [selectedMenu])

    return {
        Menu,
    }
}
