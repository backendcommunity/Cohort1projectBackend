import db from "../models/index.js";
import bcrypt from "bcrypt";
import "dotenv/config";
import { createToken } from "../middleware/auth.js";
import { sendPasswordResetEmail } from "../middleware/email.js";

const UserModel = db.users;
export const register = async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    phone_number,
    address,
    password,
    gender,
    dob,
    confirm_password,
  } = req.body;

  if (
    !first_name ||
    !last_name ||
    !email ||
    !phone_number ||
    !address ||
    !gender ||
    !dob ||
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
      gender,
      dob,
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




// forget password
export const forgetPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ error: true, message: "Missing required fields" });
  }

  try {
    const user = await UserModel.findOne({ where: { email } });

    if (!user) {
      return res
        .status(403)
        .json({ error: true, message: "user does not exist" });
    }

    // Generate a password reset token
    const resetToken = createToken(user.id);

    // Save the reset token to the user record in the database
    user.resetToken = resetToken;
    await user.save();

     // Send the password reset email with the token
     await sendPasswordResetEmail(email, resetToken);


    res.status(200).json({ message: "Reset token sent to email" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};




 //confirmtoken
 export const confirmToken = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: true, message: "Token is missing" });
  }

  try {
    const userToken = await UserModel.findOne({ where: { resetToken: token } });

    if (!userToken) {
      return res.status(404).json({ error: true, message: "Invalid token" });
    }

    // Check if the token is expired
    if (userToken.resetTokenExpires < Date.now()) {
      return res.status(401).json({ error: true, message: "Token has expired" });
    }

    // Set a flag in the user's record to indicate token confirmation
    user.tokenConfirmed = true;

    // If token is valid and not expired, return success message
    res.status(200).json({ message: "Token confirmed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};





export const resetPassword = async (req, res) => {
  const { password, confirm_password } = req.body;

  if (!password || !confirm_password) {
    return res.status(400).json({ error: true, message: "Missing required fields" });
  }

  try {
    const user = await UserModel.findByPk(user.id);

    if (!user || !user.tokenConfirmed) {
      return res.status(400).json({ error: true, message: 'Token not confirmed or user not found' });
    }

    if (password !== confirm_password) {
      return res.status(400).json({ error: true, message: 'Passwords do not match' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user's password and clear reset token
    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpires = null;

    // Reset the token confirmation flag
    user.tokenConfirmed = false;

    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

