interface BaseConstants {
    title: string
    nameLabel: string
    namePlaceholder: string
    altLabel?: string
    altPlaceholder?: string
    titleLabel?: string
    titlePlaceholder?: string
}

interface CreateConstants extends BaseConstants {
    uploadText: string
    uploadSubtext: string
    createButton: string
}

interface EditConstants extends BaseConstants {
    saveButton: string
    deleteButton: string
}

// A imagem é enviada via Server Action como data URL (base64), o que infla
// o payload em ~33%. Mantemos a margem abaixo do bodySizeLimit (20mb) definido
// em next.config.ts para que a verificação no front evite o erro 413.
export const MAX_IMAGE_SIZE_MB = 14
export const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024

export const galleryPropertiesConstants = {
    CREATE: {
        title: 'Adicionar Imagem',
        uploadText: 'Adicione uma imagem abaixo clicando no botão +',
        uploadSubtext: 'ou arrastando e soltando uma imagem',
        nameLabel: 'Nome',
        namePlaceholder: 'Digite o nome da imagem...',
        createButton: 'Criar',
        altLabel: 'Texto Alternativo',
        altPlaceholder: 'Digite o texto alternativo da imagem...',
        titleLabel: 'Título',
        titlePlaceholder: 'Digite o título da imagem...',
    } as CreateConstants,
    EDIT: {
        title: 'Editar Imagem',
        nameLabel: 'Nome',
        namePlaceholder: 'Digite o nome da imagem...',
        saveButton: 'Salvar Alterações',
        deleteButton: 'Excluir',
        altLabel: 'Texto Alternativo',
        altPlaceholder: 'Digite o texto alternativo da imagem...',
        titleLabel: 'Título',
        titlePlaceholder: 'Digite o título da imagem...',
    } as EditConstants,
} as const
