const express = require("express")
const postulateController = require("../controllers/postulate")
const md_auth = require("../middlewares/authenticated")

const api = express.Router()

api.get("/postulates/me", [md_auth.asureAuth], postulateController.getPostulatesMe)
api.post("/postulate", [md_auth.asureAuth], postulateController.createPostulates)
api.delete("/postulate/:id", [md_auth.asureAuth], postulateController.deletePostulate)
api.get("/postulate/:path", [md_auth.asureAuth], postulateController.getPostulationPath)

module.exports = api