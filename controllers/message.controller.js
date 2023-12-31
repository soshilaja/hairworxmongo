import createError from "../utils/createError.js";
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";

export const createMessage = async (req, res, next) => {
  const newMessage = new Message({ 
    conversationId: req.body.conversationId,
    userId: req.user,
    message: req.body.message,
  });
  try {
    const savedMessage = await newMessage.save();
    await Conversation.findOneAndUpdate(
      { id: req.body.conversationId },
      {
        $set: {
          readBySeller: req.isSeller,
          readByBuyer: !req.isBuyer,
          lastMessage: req.body.message,
        },
      },
      { new: true }
    );
    res.status(201).send(savedMessage);
  } catch (error) {
    next;
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({ conversationId: req.params.id });
    res.status(200).send(messages);
  } catch (error) {
    next;
  }
};
