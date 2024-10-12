const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { paginate } = require('./plugins/pagnigate')

const categorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String },
    description: { type: String },
    imageName: { type: Array, default: [] },
    link: { type: String }
  },
  {
    timestamps: true
  }
)
categorySchema.plugin(paginate)

module.exports = mongoose.model('Category', categorySchema)
