const mongoose = require('mongoose')
const Schema = mongoose.Schema

const profileSchema = new Schema(
  {
    name: { type: String },
    logo: { type: String },
    address: { type: String },
    sub_address: { type: String },
    coordinates_address: { type: String },
    phone: { type: String },
    sub_phone: { type: String },
    mail: { type: String },
    sub_mail: { type: String },
    tax_code: { type: String },
    facebook: { type: String },
    message: { type: String },
    file_pdf: { type: String },
    description: { type: String },
    image: { type: String, default: '' },
    imageName: { type: Array, default: [] }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Profile', profileSchema)
