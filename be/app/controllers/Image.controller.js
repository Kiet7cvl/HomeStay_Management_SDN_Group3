const Image = require("../../models/");
const Image = require("../../models/Image");
const { uploadToCloudinary } = require("../services/upload.js");
const ErrorHandler = require("../utils/errorHandler.js");
const bufferToDataURI = require("../utils/file.js");

// Image-related functions
const uploadImage = async (req, res, next) => {
  try {
    const { file } = req;
    if (!file) throw new ErrorHandler(400, "Image is required");

    const fileFormat = file.mimetype.split("/")[1];
    const { base64 } = await bufferToDataURI(fileFormat, file.buffer);

    const imageDetails = await uploadToCloudinary(base64, fileFormat);
    const result = await imageRepository.uploadImage(imageDetails.url);
    return res.status(200).json({
      message: "Upload successful",
      data: result,
    });
  } catch (error) {
    next(new ErrorHandler(error.statusCode || 500, error.message));
  }
};

const getAllImage = async (req, res) => {
  try {
    const result = await imageRepository.getAllImage();
    return res.status(200).json({
      message: "Get all data successfully.",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ message: error.toString() });
  }
};

// Image-related repository functions
const getAllImages = async () => {
  try {
    const result = await Image.find();
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const uploadImageToRepository = async (url) => {
  try {
    const result = await Image.create({ url });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  uploadImage,
  getAllImage,
  getAllImages,
  uploadImageToRepository,
};