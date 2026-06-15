import mongoose, { Schema } from 'mongoose'

/**
 * As imagens são armazenadas diretamente no MongoDB: o binário fica em `data`
 * (base64) junto do `mimeType`. O `src` público é derivado do _id e servido
 * pela rota /api/images/[id], permitindo o uso do otimizador do next/image.
 */
export const imagesSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        data: {
            type: String,
            required: true,
        },
        mimeType: {
            type: String,
            required: true,
        },
        alt: {
            type: String,
        },
        title: {
            type: String,
        },
    },
    { minimize: false },
)

export const imagesModel =
    mongoose?.models?.Images || mongoose.model('Images', imagesSchema)
