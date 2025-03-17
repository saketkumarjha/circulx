import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

interface Cached {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

const globalWithMongo = global as typeof globalThis & {
  mongoConnections?: CachedConnections;
};

const cached: CachedConnections = globalWithMongo.mongoConnections || {
  conn1: null,
  promise1: null,
  conn2: null,
  promise2: null
};

export async function connectDB() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      console.log("MongoDB connected successfully")
      return mongoose
    })
  }

  try {
    cached.conn2 = await cached.promise2;
  } catch (e) {
    cached.promise2 = null;
    throw e;
  }

  return cached.conn2;
}

// Store in global scope for HMR (Hot Module Replacement)
if (process.env.NODE_ENV !== 'production') {
  globalWithMongo.mongoConnections = cached;
}