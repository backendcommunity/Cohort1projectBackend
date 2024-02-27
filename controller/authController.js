import db from "../models/index.js";
import bcrypt from "bcrypt";
import "dotenv/config";
import { createToken } from "../utils/jwt.js";

const UserModel = db.users;
export const register = async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    phone_number,
    address,
    password,
    confirm_password,
  } = req.body;

  if (
    !first_name ||
    !last_name ||
    !email ||
    !phone_number ||
    !address ||
    !password ||
    !confirm_password
  ) {
    return res
      .status(400)
      .json({ error: true, message: "Missing required fields" });
  }

  if (password.length < 8) {
    return res.status(400).json({
      error: true,
      message: "Password must be at least 8 characters long",
    });
  }

  if (password !== confirm_password) {
    return res
      .status(400)
      .json({ error: true, message: "Passwords do not match" });
  }

  try {
    // Check if email already exists in the database
    const existingUser = await UserModel.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: true, message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user record in the database
    const newUser = await UserModel.create({
      first_name,
      last_name,
      email,
      phone_number,
      address,
      password: hashedPassword,
    });

    res
      .status(200)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res
      .status(400)
      .json({ error: true, message: "Missing email or password" });
  }

  try {
    // Check if user exists in the database by email or phone number
    const user = await UserModel.findOne({
      where: {
        [db.Sequelize.Op.or]: [
          { email: identifier },
          { phone_number: identifier },
        ],
      },
    });

    if (!user) {
      return res.status(404).json({ error: true, message: "User not found" });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ error: true, message: "Incorrect password or email" });
    }
    // Generate JWT token

    const token = createToken(user.id);
    const { ...others } = user.dataValues;
    res.status(200).json({ message: "Login successful", token });

    ////THIS CODE WILL BE USED WHEN THE EMAIL VERIFICATION LOGIC HAS BEEN COMPLETED.
    //    if (user.isVerified) {
    //      const token = createToken(user.id);

    //      const { password, ...others } = user.dataValues;
    //      res.status(200).json({ ...others, token });
    //    } else {
    //      res.status(401).json({ message: "Verify email to login" });
    //    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};
