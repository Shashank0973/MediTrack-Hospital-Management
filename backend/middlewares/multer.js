import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = "uploads";

// Ensure upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

//multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },

  filename: function(req, file, cb) {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb (
      null, uniqueName + path.extname(file.originalname)
)
  },
});

// file filter to allow only images

const fileFilter = (req, file, cb) => {
  if(
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/webp"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only images files are allowed"), false);
  } 
};

// Multer upload instance
const upload = multer({
  storage,
  fileFilter,
  limits: { 
    fileSize: 5 * 1024 * 1024 } // 5MB limit
});

export default upload;
