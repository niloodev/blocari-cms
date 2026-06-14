import mongoose, { Schema } from 'mongoose'
import { IPage } from '../pages.types'

export const pagesSchema = new Schema<IPage>(
    {
        title: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
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
