const ProfileModel = require('../models/Profile.Model')

exports.createProfiles = async (data) => {
  return await ProfileModel.create(data)
}
exports.getProfiles = async (query) => {
  return await ProfileModel.find(query)
}
exports.deleteProfileId = async (query) => {
  return await ProfileModel.deleteOne({ _id: query._id })
}
exports.findProfilesById = async (query) => {
  return await ProfileModel.findOne({ _id: query._id }).exec()
}

exports.updateAndCreateProfiles = async (query) => {
  return await ProfileModel.findOneAndUpdate(
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
