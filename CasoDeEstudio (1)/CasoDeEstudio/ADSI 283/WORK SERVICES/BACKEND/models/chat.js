const mongoose = require("mongoose")

const chatSchema = mongoose.Schema({
    nameUser: String,
    message: String,
    date: String,
    id_Work: String,
})

module.exports = mongoose.model("Chat", chatSchema)