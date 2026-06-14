import mongoose, { Mongoose } from 'mongoose'

export let mongoClient: Mongoose

export const connectDB = async () => {
    if (mongoClient) return mongoClient
    mongoClient = await mongoose.connect(
        `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=admin`,
    )
    return mongoClient
}

export const disconnectDB = async () => {
    await mongoose.disconnect()
}
