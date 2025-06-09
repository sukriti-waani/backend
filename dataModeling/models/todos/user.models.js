// Import the mongoose library to interact with MongoDB
import mongoose from "mongoose";

// Define a new schema for the User collection
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      // required: [true, "password is requird"],
      required: true,
    },
  },
  {
    // Schema options
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create and export the User model based on the userSchema
export const User = mongoose.model("User", userSchema);
