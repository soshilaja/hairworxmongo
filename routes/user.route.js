import express from "express";
import {
  getUser,
  deleteUser,
  getUsers,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.delete("/:id", verifyToken, deleteUser);
router.get("/:id", getUser);
router.get("/", getUsers);

export default router;
