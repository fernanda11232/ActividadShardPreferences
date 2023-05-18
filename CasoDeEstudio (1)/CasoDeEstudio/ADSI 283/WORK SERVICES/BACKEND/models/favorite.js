const mongoose = require('mongoose');

const favoriteSchemma = mongoose.Schema({
    User: String,
    idWork:String
})

module.exports = mongoose.model('favorite', favoriteSchemma);