import { describe, it, expect } from 'vitest'
import {
    extractMimeTypeFromBase64,
    removeDataUrlPrefix,
    isValidImageBase64,
} from './base64Utils'

describe('Base64 Utils', () => {
    describe('extractMimeTypeFromBase64', () => {
        it('should extract MIME type from valid base64 data URL', () => {
            const base64Data =
                'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD'
            const result = extractMimeTypeFromBase64(base64Data)
            expect(result).toBe('image/jpeg')
        })

        it('should extract MIME type from PNG base64 data URL', () => {
            const base64Data =
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
            const result = extractMimeTypeFromBase64(base64Data)
            expect(result).toBe('image/png')
        })

        it('should extract MIME type from WebP base64 data URL', () => {
            const base64Data =
                'data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAADsAD+JaQAA3AAAAAA'
            const result = extractMimeTypeFromBase64(base64Data)
            expect(result).toBe('image/webp')
        })

        it('should return null for invalid base64 data URL', () => {
            const base64Data = 'invalid-base64-data'
            const result = extractMimeTypeFromBase64(base64Data)
            expect(result).toBeNull()
        })

        it('should return null for empty string', () => {
            const result = extractMimeTypeFromBase64('')
            expect(result).toBeNull()
        })
    })

    describe('removeDataUrlPrefix', () => {
        it('should remove data URL prefix from base64 string', () => {
            const base64Data =
                'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD'
            const result = removeDataUrlPrefix(base64Data)
            expect(result).toBe('/9j/4AAQSkZJRgABAQAAAQABAAD')
        })

        it('should return original string if no data URL prefix', () => {
            const base64Data = '/9j/4AAQSkZJRgABAQAAAQABAAD'
            const result = removeDataUrlPrefix(base64Data)
            expect(result).toBe(base64Data)
        })
    })

    describe('isValidImageBase64', () => {
        it('should return true for valid image base64', () => {
            const base64Data =
                'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD'
            const result = isValidImageBase64(base64Data)
            expect(result).toBe(true)
        })

        it('should return true for PNG image base64', () => {
            const base64Data =
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
            const result = isValidImageBase64(base64Data)
            expect(result).toBe(true)
        })

        it('should return false for non-image base64', () => {
            const base64Data = 'data:text/plain;base64,SGVsbG8gV29ybGQ='
            const result = isValidImageBase64(base64Data)
            expect(result).toBe(false)
        })

        it('should return false for invalid base64', () => {
            const base64Data = 'invalid-data'
            const result = isValidImageBase64(base64Data)
            expect(result).toBe(false)
        })
    })
})
