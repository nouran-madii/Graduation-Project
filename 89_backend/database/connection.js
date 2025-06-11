import mongoose from 'mongoose';
import { DB_URI } from "../config/env.js";

if (!DB_URI) {
    throw new Error("MongoDB URI doesn't exist");
}

const connection = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log(`MongoDB URI connection was connected`);
    } catch (error) {
        console.error('Error connecting to database: ',error);
        process.exit(1);
    }
}

export default connection;