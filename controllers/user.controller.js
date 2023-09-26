import User from "../models/user.model.js";
import createError from "../utils/createError.js";

export const deleteUser = async (req, res, next) => {
  try {
    // get user from db
    const user = await User.findById(req.params.id);

    // Check if user is authorized
    // console.log(req.user, user._id.toString());
    if (req.user !== user._id.toString()) {
      return next(createError(403, "You can only delete your own account!"));
    }

    // Delete user
    await User.findByIdAndDelete(req.params.id);

    // Send response
    res.status(200).send("User deleted successfully!");
  } catch (error) {
    res.status(500).send("An error occurred while deleting the user.");
  }
};

export const getUser = async (req, res, next) => {
  // get user from db
  const user = await User.findById(req.params.id);

  // Send user
  // console.log(user);
  res.status(200).send(user);
};

export const getUsers = async (req, res, next) => {
  try {
    // get users from db

    const users = await User.find(
      {isSeller: true},
      { password: 0, email: 0, createdAt: 0, updatedAt: 0, _id: 0, isSeller: 0, __v: 0 }
    );

    // Send users
      res.status(200).send(users);
    
  } catch (error) {
    res.status(500).send("An error occurred while getting the users.");
  }
};
