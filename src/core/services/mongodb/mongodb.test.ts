import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import mongoose from 'mongoose'

vi.mock('mongoose', () => ({
    default: {
        connect: vi.fn().mockResolvedValue(true),
        disconnect: vi.fn(),
    },
}))

describe('Services: MongoDB', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        vi.resetModules()
    })

    afterEach(() => {
        delete process.env.MONGO_URL
    })

    it('should connect to MongoDB with the correct URL', async () => {
        process.env.MONGO_URL =
            'mongodb://user:password@localhost:27017/test?retryWrites=true&authSource=admin'

        const { connectDB } = await import('./mongodb')

        await connectDB()

        expect(mongoose.connect).toHaveBeenCalledWith(
            'mongodb://user:password@localhost:27017/test?retryWrites=true&authSource=admin',
        )
        expect(mongoose.connect).toHaveBeenCalledTimes(1)
    })

    it('should connect to MongoDB Atlas with mongodb+srv protocol', async () => {
        process.env.MONGO_URL =
            'mongodb+srv://user:password@gear.soscdka.mongodb.net/test?retryWrites=true&w=majority'

        const { connectDB } = await import('./mongodb')

        await connectDB()

        expect(mongoose.connect).toHaveBeenCalledWith(
            'mongodb+srv://user:password@gear.soscdka.mongodb.net/test?retryWrites=true&w=majority',
        )
        expect(mongoose.connect).toHaveBeenCalledTimes(1)
    })

    it('should throw error when MONGO_URL environment variable is missing', async () => {
        delete process.env.MONGO_URL

        const { connectDB } = await import('./mongodb')

        await expect(connectDB()).rejects.toThrow(
            'Variável de ambiente MONGO_URL não configurada',
        )
    })

    it('should not reconnect if there is already a connection', async () => {
        process.env.MONGO_URL = 'mongodb://user:password@localhost:27017/test'

        const { connectDB } = await import('./mongodb')

        await connectDB()
        await connectDB()

        expect(mongoose.connect).toHaveBeenCalledTimes(1)
    })

    it('should disconnect from MongoDB correctly', async () => {
        const { disconnectDB } = await import('./mongodb')

        await disconnectDB()

        expect(mongoose.disconnect).toHaveBeenCalledTimes(1)
    })
})
