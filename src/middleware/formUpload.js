const multer = require("multer");
const cloudinaryUpload = require("../../helper/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/upload/");
  },
  filename: function (req, file, cb) {
    cb(null, `${new Date().getTime()}-${file.originalname}`);
  },
});

const storageOnline = new CloudinaryStorage({
  cloudinary: cloudinaryUpload,
  params: {
    folder: "img-profile-users",
    format: async (req, file) => "png",
    public_id: (req, file) => new Date().getTime(),
  },
});

const formUploadOnline = multer({
  storage: storageOnline,
  fileFilter: (req, file, cb) => {
    //console.log(file);
    let formatType = path.extname(file.originalname);
    if (formatType == ".png" || formatType == ".jpg" || formatType == ".jpeg") {
      cb(null, true);
    } else {
      cb("image not valid", false);
    }
  },
  limits: {
    fileSize: 1048576 * 3, //3 mb
  },
  //dest: './public/data/uploads/'
});

// const formUpload = multer({
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//     //console.log(file);
//     let formatType = path.extname(file.originalname);
//     if (formatType == ".png" || formatType == ".jpg" || formatType == ".jpeg") {
//       cb(null, true);
//     } else {
//       cb("image not valid", false);
//     }
//   },
//   limits: {
//     fileSize: 1048576 * 3, //3 mb
//   },
//   //dest: './public/data/uploads/'
// });

module.exports = formUploadOnline;
