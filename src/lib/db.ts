import mongoose from 'mongoose';

/**
 * Connects to the MongoDB database using the provided connection string.
 *
 * @returns {Promise<typeof mongoose>} A promise that resolves to the mongoose instance upon successful connection.
 * @throws {Error} Throws an error if the connection to MongoDB fails.
 */
export async function connectToDB(): Promise<
  mongoose.Mongoose | Error
> {
  try {
    return await mongoose.connect(process.env.MONGODB_URI ?? '');
  } catch (err) {
    throw new Error(`Failed to connect to MongoDB: ${err}`);
  }
}
