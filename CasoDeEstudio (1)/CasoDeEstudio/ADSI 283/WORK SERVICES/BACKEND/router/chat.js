const express = require("express")
const chatController = require("../controllers/chat")
const md_auth = require("../middlewares/authenticated")

const api = express.Router()

api.get("/chat/:path", [md_auth.asureAuth], chatController.getMessages)
api.post("/chat", [md_auth.asureAuth], chatController.saveMessage)
api.delete("/chat/:id", [md_auth.asureAuth], chatController.deleteMessages)

module.exports = api