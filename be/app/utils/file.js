const DatauriParser = require("datauri/parser.js");
const parser = new DatauriParser();

const bufferToDataURI = async (fileFormat, buffer) => {
  try {
    const base64 = await parser.format(fileFormat, buffer);
    return base64;
  } catch (error) {
    console.error("Error converting buffer to data URI:", error);
    throw new ErrorHandler(500, "Error converting buffer to data URI");
  }
};
module.exports = bufferToDataURI;

// export default bufferToDataURI;
