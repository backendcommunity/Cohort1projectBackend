import db from "../models/index.js";
import bcrypt from "bcrypt";
import "dotenv/config";
import { createToken } from "../middleware/auth.js";

const UserModel = db.users;

export const updateUserInfo = async (req, res, next) => {
  const userId = req.userId;
  let updateData = { ...req.body };
  try {
    const user = await UserModel.findOne({ where: { id: userId } });
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      updateData = { ...updateData, profile_url: result?.secure_url };
    }
    await user.update(updateData);
    return res
      .status(200)
      .json({ status: true, message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};


