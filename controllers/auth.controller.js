import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const register = async (req, res, next) => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });
    // if user exists
    if (existingUser) return res.status(409).send("User already exists");

    // generate new password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // create new user
    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    });
    // save user and respond
    await newUser.save();
    res.status(201).send("User created");
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  try {
    // find user
    const user = await User.findOne({ username: req.body.username });

    // if user not found
    if (!user) return next(createError(404, "User not found!"));
    // if user found, check password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    // if password is wrong
    if (!validPassword)
      return next(createError(404, "Wrong username or password!"));

    // create token
    const token = jwt.sign(
      { id: user._id, isSeller: user.isSeller },
      process.env.JWT_KEY
    );

    // if password is correct
    const { password, ...others } = user._doc; // _doc is the user object
    res
      .cookie("accessToken", token, { httpOnly: true })
      .status(200)
      .send(others);
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    // Clear the access token cookie
    res.clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    });

    // Send the logout response
    res.status(200).send("User logged out successfully!");
  } catch (error) {
    next(error);
  }
};
