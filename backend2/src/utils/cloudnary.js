// Importing cloudinary v2 module and renaming it as 'cloudinary'
import { v2 as cloudinary } from "cloudinary";

// Importing 'fs' module from Node.js to work with file system (for deleting local files)
import fs from "fs";

// Configuring cloudinary with credentials stored in environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Cloudinary account cloud name
  api_key: process.env.CLOUDINARY_API_KEY, // Cloudinary API key
  api_secret: process.env.CLOUDINARY_API_SECRET, // Cloudinary API secret
});

// Creating an asynchronous function to handle file upload to cloudinary
const uploadOnCloudinary = async (localFilePath) => {
  try {
    // Checking if file path is provided. If not, simply return null (nothing to upload).
    if (!localFilePath) return null;

    // Uploading the file to cloudinary using uploader.upload() method
    // 'resource_type: auto' allows cloudinary to automatically detect file type (image, video, etc.)
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // If upload is successful, log the URL of uploaded file
    console.log("file is uploaded on cloudinary", response.url);

    // Return the full response object from cloudinary (it contains many details about uploaded file)
    return response;
  } catch (error) {
    // If any error occurs during upload, delete the local file (cleanup)
    fs.unlinkSync(localFilePath); // Synchronously remove the file from local file system
    // Return null as upload failed
    return null;
  }
};

// Exporting the function so that it can be imported and used in other files/modules
export { uploadOnCloudinary };
