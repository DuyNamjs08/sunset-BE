const QuestionModel = require('../models/Question.model')

exports.createQuestions = async (data) => {
  return await QuestionModel.create(data)
}
exports.getQuestions = async (query) => {
  return await QuestionModel.find(query)
}
exports.deleteQuestionId = async (query) => {
  return await QuestionModel.deleteOne({ _id: query._id })
}
exports.findQuestionsById = async (query) => {
  return await QuestionModel.findOne({ _id: query._id }).exec()
}

exports.updateAndCreateQuestions = async (query) => {
  return await QuestionModel.findOneAndUpdate(
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
