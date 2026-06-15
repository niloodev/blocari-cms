'use client'

import { Button } from '@/shared/libs/heroui'
import { Database } from 'lucide-react'
import { useDynamicRouteHelper } from './DynamicRouteHelper.hook'
import {
    DraggableField,
    CustomModal,
    CustomModalBody,
    CustomModalFooter,
} from './subcomponents'
export function DynamicRouteHelper() {
    const { hasDynamicAdapter, mappedFields, isOpen, onOpen, onOpenChange } =
        useDynamicRouteHelper()

    if (!hasDynamicAdapter) return null

    return (
        <>
            <Button
                size="md"
                variant="flat"
                color="primary"
                onPress={onOpen}
                className="bg-content2 mr-2"
            >
                <Database size={16} />
                Campos
            </Button>

            <CustomModal
                isOpen={isOpen}
                onClose={onOpenChange}
                title="Campos Disponíveis"
                size="2xl"
            >
                <CustomModalBody>
                    <p className="text-sm text-default-500 mb-4">
                        Arraste os campos do adaptador nos campos compatíveis.
                        <br />
                        <span className="text-xs text-default-500">
                            Os campos compatíveis são os campos que possuem o
                            mesmo tipo do campo do Adaptador.
                        </span>
                    </p>
                    <div className="h-[50vh] overflow-hidden">
                        <div className="h-full overflow-y-auto overflow-x-hidden">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 overflow-hidden">
                                {mappedFields.map(field => (
                                    <DraggableField
                                        key={field.id}
                                        field={field}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </CustomModalBody>

                <CustomModalFooter>
                    <Button
                        color="danger"
                        variant="light"
                        onPress={onOpenChange}
                    >
                        Fechar
                    </Button>
                </CustomModalFooter>
            </CustomModal>
        </>
    )
}
