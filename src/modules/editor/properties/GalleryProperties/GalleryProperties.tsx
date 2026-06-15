'use client'

import {
    PropertyContainer,
    PropertyTitle,
} from '@/modules/editor/components/atoms'
import { FieldFiles, FieldText } from '@/modules/editor/fields'
import Image from 'next/image'
import { Button } from '@/shared/libs/heroui'
import { useGalleryProperties } from './GalleryProperties.hook'

export function GalleryProperties() {
    const {
        form,
        isCreateMode,
        isSubmitting,
        handleFilesChange,
        handleSubmit,
        currentFiles,
        createConstants,
        editConstants,
        previewUrl,
    } = useGalleryProperties()

    return (
        <div className="properties-wrapper">
            <PropertyTitle>
                {isCreateMode ? createConstants.title : editConstants.title}
            </PropertyTitle>
            <PropertyContainer>
                <div className="flex justify-center items-center min-h-[150px] bg-content2 rounded-[8px] border-2 border-dashed border-content3">
                    {previewUrl ? (
                        <Image
                            src={previewUrl}
                            alt="Preview"
                            width={150}
                            height={150}
                            className="object-cover rounded-[8px] w-full"
                        />
                    ) : (
                        <div className="text-center text-foreground-500">
                            <div className="text-sm">
                                {createConstants.uploadText}
                            </div>
                            <div className="text-xs mt-1">
                                {createConstants.uploadSubtext}
                            </div>
                        </div>
                    )}
                </div>
            </PropertyContainer>
            <form onSubmit={handleSubmit} className="scrollable-wrapper">
                <FieldText
                    label={
                        isCreateMode
                            ? createConstants.nameLabel
                            : editConstants.nameLabel
                    }
                    value={form.watch('name')}
                    placeholder={
                        isCreateMode
                            ? createConstants.namePlaceholder
                            : editConstants.namePlaceholder
                    }
                    isRequired
                    onValueChange={value => form.setValue('name', value)}
                />
                <FieldFiles
                    label="Arquivo"
                    files={currentFiles}
                    limit={1}
                    allowedExtensions={'.png,.jpg,.jpeg,.webp,.avif,.gif'}
                    onValueChange={handleFilesChange}
                />
                <FieldText
                    label={
                        isCreateMode
                            ? createConstants.altLabel
                            : editConstants.altLabel
                    }
                    value={form.watch('alt')}
                    placeholder={
                        isCreateMode
                            ? createConstants.altPlaceholder
                            : editConstants.altPlaceholder
                    }
                    onValueChange={value => form.setValue('alt', value)}
                />
                <FieldText
                    label={
                        isCreateMode
                            ? createConstants.titleLabel
                            : editConstants.titleLabel
                    }
                    value={form.watch('title')}
                    placeholder={
                        isCreateMode
                            ? createConstants.titlePlaceholder
                            : editConstants.titlePlaceholder
                    }
                    onValueChange={value => form.setValue('title', value)}
                />
                {form.formState.errors.src && (
                    <div className="text-danger text-xs mt-1 mx-5">
                        {form.formState.errors.src.message}
                    </div>
                )}
                <div className="flex gap-2 mt-4">
                    <Button
                        type="submit"
                        size="md"
                        className="flex-1 bg-primary text-foreground-50 mx-5"
                        isDisabled={isSubmitting}
                        isLoading={isSubmitting}
                    >
                        {isCreateMode
                            ? createConstants.createButton
                            : editConstants.saveButton}
                    </Button>
                </div>
            </form>
        </div>
    )
}
