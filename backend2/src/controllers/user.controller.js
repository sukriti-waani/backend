// Import necessary utilities and modules
import { asyncHandler } from "../utils/asyncHandler.js"; // Wrapper to catch async errors
import { ApiError } from "../utils/apiError.js"; // Custom error handling class
import { User } from "../models/user.js"; // User model from MongoDB
import { uploadOnCloudinary } from "../utils/cloudinary.js"; // Function to upload files to Cloudinary
import { ApiResponse } from "../utils/ApiResponse.js"; // Standard API response class

// Main function to register a user
const registerUser = asyncHandler(async (req, res) => {
  // Destructure user input from the request body
  const { fullName, email, username, password } = req.body;

  console.log("email: ", email); // For debugging purposes

  // Check if any of the required fields are empty
  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if a user already exists with the same username or email
  // Important: Need to `await` the async DB query
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with username or email already exists");
  }

  // Get uploaded file paths from the request (Multer handles these)
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  // Avatar is mandatory for registration
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  // Upload files to Cloudinary and get their hosted URLs
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath); // Optional

  // Ensure avatar uploaded successfully
  if (!avatar) {
    throw new ApiError(400, "Avatar upload failed");
  }

  // Create the user document in MongoDB
  const user = await User.create({
    fullName,
    avatar: avatar.url, // Store Cloudinary avatar URL
    coverImage: coverImage?.url || "", // Optional cover image
    email,
    password, // Will be hashed in User model pre-save hook (assumed)
    username: username.toLowerCase(), // Normalize username
  });

  // Retrieve the created user and exclude sensitive fields
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  // If retrieval fails, throw error
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  // Return a success response with created user details
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

// Export the function to use in routes
export { registerUser };
