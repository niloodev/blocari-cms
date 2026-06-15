import { Adapter } from './adapters.types'

/**
 * Registro de adapters de conteúdo dinâmico.
 *
 * O sistema de adapters é genérico: cada adapter mapeia uma fonte de dados
 * externa para elementos reutilizáveis em rotas dinâmicas do CMS.
 * Registre novos adapters aqui, ex: `{ meusCarros: meusCarrosAdapter }`.
 */
export const adapters: Record<string, Adapter<unknown>> = {}
