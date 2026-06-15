import mongoose, { Schema } from 'mongoose'
import { IPage } from '../pages.types'

export const pagesSchema = new Schema<IPage>(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
            default: '',
        },
        canonical: {
            type: String,
            required: false,
            default: '',
        },
        opengraphImage: {
            type: String,
            required: false,
            default: '',
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        dynamicAdaptor: {
            type: String,
            required: false,
            default: '',
        },
        content: {
            type: Object,
            required: true,
            root: {
                type: Object,
                required: true,
            },
            content: {
                type: [Object],
                required: true,
            },
            zones: {
                type: Object,
                required: true,
            },
        },
    },
    { minimize: false },
)

export const pagesModel =
    mongoose?.models?.Pages || mongoose.model('Pages', pagesSchema)
