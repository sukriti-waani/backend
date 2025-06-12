// Install cookie-parser and cors using npm before running:
// npm i cookie-parser cors

// Import express framework for handling HTTP requests and responses
import express from "express";

// Import cookie-parser to parse cookies attached to client requests
import cookieParser from "cookie-parser";

// Import cors (Cross-Origin Resource Sharing) to allow communication between different domains (client & server)
import cors from "cors";

// Initialize express application
const app = express();

// Use CORS middleware to handle Cross-Origin requests:
// - origin: specifies which client URLs are allowed to access this backend.
// - credentials: true allows cookies, authorization headers, and TLS client certificates to be exposed to the browser.
app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // Allowed frontend URL (stored in .env)
    credentials: true, // Allow sending cookies & credentials (used in authentication)
  })
);

// Use express built-in middleware to parse incoming JSON data:
// - limit: "16kb" means request body size should not exceed 16 kilobytes.
app.use(express.json({ limit: "16kb" }));

// Use express built-in middleware to parse URL-encoded data (from HTML forms):
// - extended: true allows rich objects and arrays to be encoded into URL-encoded format.
// - limit: "16kb" restricts payload size to 16KB to prevent very large data submissions.
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Use express middleware to serve static files (images, CSS, JS, etc.) from 'public' folder:
app.use(express.static("public"));

// This middleware parses cookies from the HTTP request headers.
// After parsing, all cookies will be available in req.cookies object.
// Very useful for authentication, session management, or tracking user preferences.
app.use(cookieParser());

// Export the express app instance so it can be used in other files (e.g. index.js for starting server)
export { app };
