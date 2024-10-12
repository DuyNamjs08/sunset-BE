const PromoteModel = require('../models/Promotion.model')

exports.createPromotes = async (data) => {
  return await PromoteModel.create(data)
}
exports.getPromotes = async (query) => {
  return await PromoteModel.find(query)
}
exports.deletePromoteId = async (query) => {
  return await PromoteModel.deleteOne({ _id: query._id })
}
exports.findPromotesById = async (query) => {
  return await PromoteModel.findOne({ _id: query._id }).exec()
}

exports.updateAndCreatePromotes = async (query) => {
  return await PromoteModel.findOneAndUpdate(
    {
      _id: query._id
    },
    {
      $set: {
        ...query
      }
    },
    { new: true }
  )
}
