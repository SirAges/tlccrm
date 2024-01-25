import { Schema } from "mongoose";

const ChatSchema = new Schema({
  senderId: {
    type: String,

    required: true,
  },
  receiverId: {
    type: String,
  },
  message: {
    type: String,
    required: true,
  },
  replyId: {
    type: String,
  },
});

export default ChatSchema;
