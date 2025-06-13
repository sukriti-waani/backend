// Importing multer package for handling multipart/form-data (used for file uploads)
import multer from "multer";

// Defining storage strategy for multer using diskStorage (files will be stored locally on disk)
const storage = multer.diskStorage({
  // 'destination' is a function that decides the folder where files will be stored
  destination: function (req, file, cb) {
    // cb (callback) is called with the folder path where files should be saved
    cb(null, "./public/temp"); // Files will be stored inside 'public/temp' directory
  },

  // 'filename' is a function that decides what name the uploaded file will have when stored
  filename: function (req, file, cb) {
    // Here, we are simply saving the file with its original name as provided by the user
    cb(null, file.originalname);
  },
});

// Creating multer instance and passing the defined storage configuration
export const upload = multer({
  storage, // passing the storage object that we just created
});
