const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
  message: { type: String, required: true },
  user: { type: String, required: true },
  dateAdded: { type: Date, default: () => Date.now()} 
})

module.exports = mongoose.model('Message', MessageSchema)