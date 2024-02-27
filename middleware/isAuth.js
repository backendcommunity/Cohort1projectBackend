import "dotenv/config";
import { decodeToken } from "../utils/jwt.js";
import httpStatus from "http-status";

export async function isAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ status: false, message: "Authentication Invalid" });
    }
    //GET TOKEN
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        status: false,
        message: "Authorization Token is not present",
      });
    }

    const decoded = await decodeToken(token, next);
    if (!decoded) {
      const error = new Error("Not Authorized - Invalid Token");
      error.statusCode = httpStatus.UNAUTHORIZED;
      throw error;
    }
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.log("Authentication Error -", error);
    error.statusCode = httpStatus.UNAUTHORIZED;
    next(error);
  }
}
