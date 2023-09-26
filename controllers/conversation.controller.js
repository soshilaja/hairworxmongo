import createError from "../utils/createError.js";
import Conversation from "../models/conversation.model.js";

export const createConversation = async (req, res, next) => {
  const newConversation = new Conversation({
    id: req.isSeller ? req.user + req.body.to : req.body.to + req.user,
    sellerId: req.isSeller ? req.user : req.body.to,
    buyerId: req.isSeller ? req.body.to : req.user,
    readBySeller: req.isSeller,
    readByBuyer: !req.isSeller,
  });
  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (error) {
    next;
  }
};

export const updateConversations = async (req, res, next) => {
  try {
    const updatedConversation = await Conversation.findByIdAndUpdate(
      { id: req.params.id },
      {
        $set: {
          ...(req.isSeller ? { readBySeller: true } : { readByBuyer: true }),
        },
      },
      { new: true }
    );
    res.status(200).json(updatedConversation);
  } catch (error) {
    next;
  }
};
export const getSingleConversations = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({ id: req.params.id });

    if (!conversation) return next(createError(404, "Conversation not found"));
    res.status(200).json(conversation);
  } catch (error) {
    next;
  }
};
export const getConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation.find(
      req.isSeller ? { sellerId: req.user } : { buyerId: req.user }
    ).sort({ updatedAt: -1 });
    res.status(200).json(conversations);
  } catch (error) {
    next;
  }
};
