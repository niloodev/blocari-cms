import mongoose, { Mongoose } from 'mongoose'

export let mongoClient: Mongoose

/**
 * Resolve a URL de conexão do MongoDB.
 * Aceita um `MONGO_URL` completo (ex: MongoDB Atlas) ou monta a URL a partir
 * das variáveis separadas usadas no setup standalone via docker-compose.
 */
const resolveMongoUrl = (): string | undefined => {
    if (process.env.MONGO_URL) return process.env.MONGO_URL

    const user = process.env.MONGO_INITDB_ROOT_USERNAME
    const password = process.env.MONGO_INITDB_ROOT_PASSWORD
    const host = process.env.MONGO_HOST
    const port = process.env.MONGO_PORT
    const db = process.env.MONGO_DB

    if (host && port && db) {
        const auth = user && password ? `${user}:${password}@` : ''
        return `mongodb://${auth}${host}:${port}/${db}?authSource=admin`
    }

    return undefined
}

export const connectDB = async () => {
    if (mongoClient) return mongoClient

    const mongoUrl = resolveMongoUrl()

    if (!mongoUrl) {
        throw new Error('Variável de ambiente MONGO_URL não configurada')
    }

    mongoClient = await mongoose.connect(mongoUrl)
    return mongoClient
}

export const disconnectDB = async () => {
    await mongoose.disconnect()
}
