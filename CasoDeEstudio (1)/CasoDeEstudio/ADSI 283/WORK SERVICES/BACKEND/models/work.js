const mongoose = require("mongoose")

const workSchema = mongoose.Schema({
    name: String,
    description: String,
    imageWork: String,
    status: Boolean,
    date: String,
    address: String,
    price: Number,
    postulates: Number,
    userWork: String,
    userPostulate: String,
})

module.exports = mongoose.model('Work', workSchema)