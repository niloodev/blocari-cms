'use client'

import {
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from '@/shared/libs/heroui'
import { DynamicFieldsModalProps } from './DynamicFieldsModal.types'

export function DynamicFieldsModal({
    isOpen,
    onClose,
    onSelect,
    fields,
    title,
    description,
    fieldType = 'single',
}: DynamicFieldsModalProps) {
    const defaultTitle =
        fieldType === 'single'
            ? 'Selecionar Campo Dinâmico'
            : 'Selecionar Campo Dinâmico (Array)'

    const defaultDescription =
        fieldType === 'single'
            ? 'Selecione um campo do adaptador que contenha uma URL de imagem.'
            : 'Selecione um campo do adaptador que contenha um array de URLs de imagens.'

    const filteredFields = fields.filter(field => {
        if (fieldType === 'single') {
            return (
                field.type === 'string' ||
                field.type === 'number' ||
                field.type === 'boolean'
            )
        } else if (fieldType === 'array') {
            return field.type === 'array'
        }
    })

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="2xl">
            <ModalContent>
                <ModalHeader>{title || defaultTitle}</ModalHeader>
                <ModalBody>
                    <p className="text-sm text-default-500 mb-4">
                        {description || defaultDescription}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                        {filteredFields.map(field => (
                            <Button
                                key={field.id}
                                variant="flat"
                                color="primary"
                                className="h-auto p-4 text-left justify-start"
                                onPress={() => onSelect(`<${field.id}>`)}
                            >
                                <div className="flex flex-col items-start gap-1">
                                    <span className="font-medium">
                                        {field.label}
                                    </span>
                                    <span className="text-xs text-default-500">
                                        ID: {field.id}
                                    </span>
                                </div>
                            </Button>
                        ))}
                    </div>

                    {filteredFields.length === 0 && (
                        <div className="text-center py-8 text-foreground-500">
                            Nenhum campo compatível encontrado
                        </div>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                        Cancelar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
