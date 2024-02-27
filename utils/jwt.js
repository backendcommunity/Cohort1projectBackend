import jwt from "jsonwebtoken";
import "dotenv/config";

/**
 * @param {id} id
 * @returns token
 */
export const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

/**
 * @param {token} token
 * @param {next} next
 * @returns decoded token if no error
 */
export const decodeToken = (token, next) => {
  try {
    const decoded = jwt.decode(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    console.log("Decode Token Error -", error.message);
    error.statusCode(401);
    next(error);
  }
};
