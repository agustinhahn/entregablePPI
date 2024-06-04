import mongoose from "mongoose"

export const messageCollectionName = "messages"

const messageSchema = new mongoose.Schema({
    user: { type: String, required: true },
    message:{type: String, required: true}
})

export const MessageModel = mongoose.model(
    messageCollectionName,
    messageSchema
)