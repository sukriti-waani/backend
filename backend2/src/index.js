// require('dotenv').config({path: './env'})
import dotenv from "dotenv";         // Import dotenv for loading env variables
import connectDB from "./db/index.js";  // Import the connectDB function from your local db folder

// Load environment variables from .env file
dotenv.config({
  path: "./.env",   // Specify the path to your .env file
});

// Call connectDB to connect to MongoDB
connectDB();


/*
import mongoose from "mongoose";
// Import DB_NAME constant from a local 'constants' module/file
import { DB_NAME } from "./constants";

// Import express library to create server and handle routes
import express from "express";

// Initialize the express app instance
const app = express();

// Immediately Invoked Async Function Expression (IIFE)
// This function runs immediately when the file is executed
(async () => {
  try {
    // Try to connect to MongoDB using mongoose
    // `process.env.MONGOBD_URI` is the MongoDB base URI stored in environment variables
    // DB_NAME is appended to complete the database connection URL
    await mongoose.connect(`${process.env.MONGOBD_URI}/${DB_NAME}`);

    // Register an event listener on the express app to listen for any app-level errors
    app.on("error", (error) => {
      console.error("Error connecting to MongoDB", error); // Log the error
      throw error; // Re-throw error so it can be handled by the outer catch
    });

    // Start the express server, listening on port defined in environment variables
    app.listen(process.env.PORT, () => {
      console.log(`App is listening on port ${process.env.PORT}`); // Log that server has started
    });
  } catch (error) {
    console.error("ERROR: ", error);
  }
})();
*/
