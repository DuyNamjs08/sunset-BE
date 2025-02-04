const mongoose = require('mongoose')
const Schema = mongoose.Schema

const promotionSchema = new Schema(
  {
    code: { type: String, required: true, unique: true },
    discount: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isActive: { type: Boolean, default: true }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Promotion', promotionSchema)
