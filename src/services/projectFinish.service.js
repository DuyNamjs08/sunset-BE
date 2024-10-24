const ProjectFinish = require('../models/ProjectFinish.model')

exports.createProjectFinish = async (data) => {
  return await ProjectFinish.create(data)
}
exports.getProjectFinish = async (query) => {
  return await ProjectFinish.find(query)
}
exports.deleteProjectFinishId = async (query) => {
  return await ProjectFinish.deleteOne({ _id: query._id })
}
exports.findProjectFinishById = async (query) => {
  return await ProjectFinish.findOne({ _id: query._id }).exec()
}

exports.updateAndCreateProjectFinish = async (query) => {
  return await ProjectFinish.findOneAndUpdate(
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
