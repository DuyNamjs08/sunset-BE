const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mailSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    phone: { type: String, required: true }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Mails', mailSchema)
