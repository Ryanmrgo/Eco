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
                // Replace MongoDB schemes with http:// so the URL constructor
                // can parse the URI.  Handle both mongodb:// and mongodb+srv://.
                const withProto = uri
                    .replace(/^mongodb\+srv:\/\//, "http://")
                    .replace(/^mongodb:\/\//, "http://")
                return new URL(withProto).pathname.replace(/^\//, "").length > 0
            } catch (err) {
                throw new Error(
                    `MONGODB_URI is malformed and could not be parsed: ${err.message}`
                )
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