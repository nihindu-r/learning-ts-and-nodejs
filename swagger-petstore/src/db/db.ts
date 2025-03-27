import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

console.log(process.env.DB_URL)
const dbConnect = async (): Promise<void> => {
    try {
      const URL = process.env.DB_URL || "NO URL FOUND";
      await mongoose.connect(URL);
      console.log("Successfully connected to MongoDB Atlas!");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      process.exit(1);
    }
  };

  export default dbConnect;