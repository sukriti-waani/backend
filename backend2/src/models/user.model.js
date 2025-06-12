// Import mongoose and extract Schema constructor from mongoose
import mongoose, { Schema } from "mongoose";

// Import jsonwebtoken for generating JWT tokens
import jwt from "jsonwebtoken";

// Import bcryptjs for hashing and comparing passwords
import bcrypt from "bcryptjs";

// Create a new mongoose schema for the User model
const userSchema = new Schema(
  {
    // Username field
    username: {
      type: String, // It must be a string
      required: true, // It is required while creating user
      unique: true, // No two users can have the same username
      lowercase: true, // Always store in lowercase for consistency
      trim: true, // Remove whitespace from both ends
      index: true, // Create an index for faster search
    },

    // Email field
    email: {
      type: String,
      required: true,
      unique: true, // No two users can have the same email
      lowercase: true,
      trim: true,
    },

    // Full name field
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true, // Indexed for faster queries/searches
    },

    // Avatar (profile picture) stored as URL (usually cloudinary or any storage url)
    avatar: {
      type: String,
      required: true,
    },

    // Cover image (optional field)
    coverImage: {
      type: String,
    },

    // Watch history (array of video IDs that user has watched)
    watchHistory: [
      {
        type: Schema.Types.ObjectId, // Refers to another MongoDB document ID
        ref: "Video", // References the Video model
      },
    ],

    // Password field
    password: {
      type: String,
      required: [true, "Password is required"], // Custom error message if not provided
    },

    // Refresh token field (used for token-based authentication)
    refreshToken: {
      type: String,
    },
  },

  // Mongoose option: automatically creates createdAt and updatedAt fields
  {
    timestamps: true,
  }
);

// ==================== Middleware ====================
// Pre-save hook: called before saving the document into DB
userSchema.pre("save", async function (next) {
  // If password is not modified (i.e., while updating other fields), skip hashing
  if (!this.isModified("password")) return next();

  // If password is modified, hash it before saving
  this.password = bcrypt.hash(this.password, 10); // 10 = salt rounds
  next();
});

// ==================== Instance Methods ====================
// Method to compare entered password with hashed password
userSchema.methods.isPasswordCorrect = async function (password) {
  // bcrypt.compare returns true if passwords match
  return await bcrypt.compare(password, this.password);
};

// Method to generate access token for user (short-lived token)
userSchema.methods.generateAccessToken = function () {
  // Generate JWT using payload and secret key
  return jwt.sign(
    {
      _id: this._id, // User's ID
      email: this.email, // Email
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET, // Secret key stored in environment variables
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY, // Expiry duration (ex: 15m, 1h, etc.)
    }
  );
};

// Method to generate refresh token (long-lived token)
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id, // Only ID is enough for refresh token
    },
    process.env.REFRESH_TOKEN_SECRET, // Refresh token secret
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY, // Expiry duration (ex: 7d, 30d, etc.)
    }
  );
};

// Export the User model to use in other files
export const User = mongoose.model("User", userSchema);
