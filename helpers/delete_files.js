const fs = require("fs");
const {join} = require('path')

/**
 * Delete a file safely
 * @param {string} filePath - Path to the file
 */

function deleteFiles(filePaths) {
  for(path of filePaths){

    fs.unlink(join('uploads',path), (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("File deleted:", path);
      }
    });
  }
}

function deleteFile(filePath) {
  if(!filePath) return
  fs.unlink(join('uploads',filePath), (err) => {
    if (err) {
      console.error("Error deleting file:", err);
    } else {
      console.log("File deleted:", filePath);
    }
  });
}

module.exports = {
  deleteFile,deleteFiles
}


