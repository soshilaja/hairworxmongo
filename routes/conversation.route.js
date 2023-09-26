import express from "express";
import {
  getConversations,
  getSingleConversations,
  updateConversations,
  createConversation,
} from  "../controllers/conversation.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.get("/", verifyToken, getConversations);
router.get("/single/:id", verifyToken, getSingleConversations);
router.put("/:id", verifyToken, updateConversations);
router.post("/", verifyToken, createConversation);

export default router;
