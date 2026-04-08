import mongoose from "mongoose";

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function connectDB() {
    const uri = process.env.MONGODB_URI

    if (!uri) {
        throw new Error(
            "MONGODB_URI environment variable is not set. " +
            "Copy .env.example to .env.local and fill in your MongoDB Atlas connection string."
        )
    }

    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false
        }

        // Only append the default database name when the URI doesn't already
        // include a database path (i.e. the pathname is empty or just "/").
        const hasDbPath = (() => {
            try {
                // SRV URIs: mongodb+srv://user:pass@host/dbname?...
                // Standard: mongodb://user:pass@host:port/dbname?...
                const withProto = uri.replace(/^mongodb(\+srv)?:\/\//, "http://")
                return new URL(withProto).pathname.replace(/^\//, "").length > 0
            } catch {
                return false
            }
        })()

        const connectionUri = hasDbPath ? uri : `${uri}/quickcart`

        cached.promise = mongoose.connect(connectionUri, opts).then(mongoose => {
            return mongoose
        })
    }

    cached.conn = await cached.promise
    return cached.conn
}

export default connectDB