import { Router } from "express";
import { updateUserInfo } from "../controller/userController.js";
import { isAuth } from "../middleware/isAuth.js";
import upload from "../utils/multer.js";

const router = Router();

router.route("/profile").patch(isAuth, upload.single("image"), updateUserInfo);

export default router;
