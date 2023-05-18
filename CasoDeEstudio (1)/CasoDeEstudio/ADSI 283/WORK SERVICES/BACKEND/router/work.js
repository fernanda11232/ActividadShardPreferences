const express = require("express")
const workControllers = require("../controllers/work")
const multiparty = require("connect-multiparty")
const md_auth = require("../middlewares/authenticated")

const api = express.Router()
const md_upload = multiparty({uploadDir: './uploads/imageWork'})

api.get("/works", workControllers.getWorks)
api.post("/work", [md_auth.asureAuth, md_upload], workControllers.createWork)
api.patch("/work/:id", [md_auth.asureAuth, md_upload], workControllers.updateWork)
api.delete("/work/:id", [md_auth.asureAuth], workControllers.deleteWork)
api.get("/works/:id", workControllers.getWorkPath)

module.exports = api