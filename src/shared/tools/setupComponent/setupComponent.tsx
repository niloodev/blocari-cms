import {
    ComponentConfig,
    DefaultComponentProps,
    PuckComponent,
} from '@measured/puck'
import { ReactNode } from 'react'
import { Component } from 'lucide-react'

/**
 * Configura um componente Puck com suas configurações específicas
 *
 * @param {Object} params - Parâmetros da função
 * @param {PuckComponent<DefaultComponentProps>} params.component - O componente React a ser configurado
 * @param {ComponentConfig} params.config - Configurações do componente
 * @param {ReactNode} params.icon - Ícone do componente
 * @returns {ComponentConfig} Configuração final do componente com o render definido
 */
export function setupComponent<T extends DefaultComponentProps>({
    component,
    config,
    icon = <Component />,
}: {
    component: PuckComponent<T>
    config: Omit<ComponentConfig<T>, 'render'> & { label: string }
    icon?: ReactNode
}): ComponentConfig<T> & { icon: ReactNode } {
    return {
        ...config,
        render: component,
        icon,
    }
}
