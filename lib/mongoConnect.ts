import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  // strictPopulate
  mongoose.set("strictPopulate", false);

  if (!process.env.MONGODB_URI) {
    return console.log("MONGO_URI is not defined");
  }

  if (isConnected) {
    return console.log("Using existing database connection");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "TalkFree",
    });

    isConnected = true;
  } catch (err) {
    console.error("Error connecting to database", err);
  }
};
