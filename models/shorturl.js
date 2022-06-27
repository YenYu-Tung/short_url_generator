const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shorturlSchema = new Schema({  
    shortURL: { type: String, required: true },
    originalURL: { type: String, required: true }  
})
module.exports = mongoose.model('ShortURL', shorturlSchema)