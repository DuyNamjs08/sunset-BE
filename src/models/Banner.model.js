const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bannerModel = new Schema(
  {
    description: { type: String, default: '' },
    name: { type: String, default: '' },
    image: { type: String },
    imageName: { type: Array, default: [] }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Banners', bannerModel)
