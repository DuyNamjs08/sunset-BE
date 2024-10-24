const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectFinishSchema = new Schema(
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

module.exports = mongoose.model('projectFinish', projectFinishSchema)
