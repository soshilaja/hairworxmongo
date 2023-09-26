import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const verifyToken = (req, res, next) => {
  // Get token from request's cookies
  const token = req.cookies.accessToken;

  // check if user is authenticated and logedin
  if (!token) return next(createError(401, "You are not authenticated!"));

  // Verify user's token
  jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
    // if token is invalid
    if (err) {
      return next(createError(403, "Invalid token!"));
    }

    // if token is valid
    req.user = decoded.id;
    req.isSeller = decoded.isSeller;
    next();
  });
};
