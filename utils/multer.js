import multer from "multer";
import * as path from "path";

const fileFilter = (req, file, cb) => {
  let ext = path.extname(file.originalname);
  if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
    cb(new Error("File type is not supported"), false);
    return;
  }
  cb(null, true);
};

//THE UPLOAD FUNCTION
const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter,
});

export default upload;
