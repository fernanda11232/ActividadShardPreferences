const express = require('express')
const userController = require("../controllers/user")
const multiparty = require("connect-multiparty")
const md_auth = require("../middlewares/authenticated")

const api = express.Router()
const md_upload = multiparty({uploadDir: './uploads/avatar'})

api.get("/user/me", [md_auth.asureAuth], userController.getMe)
api.get("/users", [md_auth.asureAuth], userController.getUsers)
api.post("/user", [md_auth.asureAuth, md_upload], userController.createUsers)
api.patch("/user/:id", [md_auth.asureAuth, md_upload], userController.updateUsers)
api.delete("/user/:id", [md_auth.asureAuth], userController.deleteUsers)
api.get("/user/:path", [md_auth.asureAuth], userController.getUserPath)

module.exports = api