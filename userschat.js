import { Schema, model, models } from "mongoose";
import { ChatSchema } from "@models/chat";
const UsersChatSchema = new Schema(
  {
    chatId: {
      type: String,
      required: [true, "Title is required!"],
    },

    messages: {
      type: [ChatSchema],
    },
  },
  { timestamps: true }
);

const UsersChat = models.UsersChat || model("UsersChat", UsersChatSchema);

export default UsersChat;
