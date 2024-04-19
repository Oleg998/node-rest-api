import multer from "multer";
import path from "path";
import HttpError from "../helpers/HttpError.js";

const destination = path.resolve("tmp");

const storage = multer.diskStorage({
  destination,
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    const filename =`${uniqueSuffix}_${file.originalname}`;
    cb(null, filename);
  },
});
const limits = {
  fileSize: 1024 * 1024 * 5,
};
const fileFilter = (req, file, cb) => {
  const extention = file.originalname.split(".").pop();
  if (extention === "exe") {
    return HttpError(400, "exe extation no allow");
  }
  cb(null, true);
};


const uploud = multer({
  storage,
  limits,
  fileFilter,
});

export default uploud;
