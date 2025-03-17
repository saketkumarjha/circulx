import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

interface Cached {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

interface CachedConnections {
  conn1: typeof mongoose | null;
  promise1: Promise<typeof mongoose> | null;
  conn2: typeof mongoose | null;
  promise2: Promise<typeof mongoose> | null;
}

const globalWithMongo = global as typeof globalThis & {
  mongoConnections?: CachedConnections;
};

const cached: CachedConnections = globalWithMongo.mongoConnections || {
  conn1: null,
  promise1: null,
  conn2: null,
  promise2: null,
};

export async function connectDB() {
  if (cached.conn1) {
    return cached.conn1;
  }

  if (!cached.promise1) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise1 = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      console.log('MongoDB connected successfully');
      return mongoose;
    });
  }

  try {
    cached.conn2 = await cached.promise1;
  } catch (e) {
    cached.promise1 = null;
    throw e;
  }

  return cached.conn2;
}


if (process.env.NODE_ENV !== 'production') {
  globalWithMongo.mongoConnections = cached;
}
