const mongoose = require("mongoose")

const postulateSchema = mongoose.Schema({
    userPostulate: String,
    date: String,
    id_Work: String,
})

module.exports = mongoose.model("Postulate", postulateSchema)