const MailerModel = require('../models/Mailer.model')

exports.createMails = async (data) => {
  return await MailerModel.create(data)
}
exports.getMails = async (query) => {
  return await MailerModel.find(query)
}
exports.deleteMailId = async (query) => {
  return await MailerModel.deleteOne({ _id: query._id })
}
exports.findMailsById = async (query) => {
  return await MailerModel.findOne({ _id: query._id }).exec()
}

exports.updateAndCreateMails = async (query) => {
  return await MailerModel.findOneAndUpdate(
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
