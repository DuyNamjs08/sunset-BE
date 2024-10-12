const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema(
  {
    description: { type: String, default: '' },
    name: { type: String },
    image: { type: String },
    imageName: { type: Array, default: [] }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Questions', questionSchema)
