const BannerModel = require('../models/Banner.model')

exports.createBanners = async (data) => {
  return await BannerModel.create(data)
}
exports.getBanners = async (query) => {
  return await BannerModel.find(query)
}
exports.deleteBannerId = async (query) => {
  return await BannerModel.deleteOne({ _id: query._id })
}
exports.findBanners = async (query) => {
  return await BannerModel.find({}).exec()
}

exports.updateAndCreateBanners = async (query) => {
  return await BannerModel.findOneAndUpdate(
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
