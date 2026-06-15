'use client'

import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from '@/shared/libs/heroui'
import { useDeletePageButton } from './DeletePageButton.hook'

export function DeletePageButton() {
    const { isOpen, onOpen, onOpenChange, handleDelete, isLoading, pageId } =
        useDeletePageButton()

    return (
        <>
            {pageId && (
                <Button
                    className="w-full bg-content1"
                    color="danger"
                    variant="light"
                    size="sm"
                    onPress={onOpen}
                >
                    Deletar
                </Button>
            )}
            <Modal
                isOpen={!!pageId && isOpen}
                onOpenChange={onOpenChange}
                backdrop="blur"
            >
                <ModalContent>
                    {onClose => (
                        <>
                            <ModalHeader>
                                <p className="text-lg font-bold">
                                    Tem certeza que deseja deletar a página?
                                </p>
                            </ModalHeader>
                            <ModalBody>
                                <p className="text-md">
                                    Essa ação é irreversível, e a página será
                                    removida permanentemente.
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="ghost"
                                    onPress={() => {
                                        handleDelete()
                                        onClose()
                                    }}
                                    isLoading={isLoading}
                                >
                                    {isLoading ? 'Deletando...' : 'Deletar'}
                                </Button>
                                <Button variant="ghost" onPress={onClose}>
                                    Cancelar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
