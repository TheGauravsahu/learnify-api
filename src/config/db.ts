import mongoose from "mongoose";
import env from "./env";

export const connectToDb = async () => {
  try {
    await mongoose.connect(env.DB_URL);
    console.log("✅ Successfully connected to mongodb.");
  } catch (error) {
    console.log("Failed to connect to Database.");
  }
};
