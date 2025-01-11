const TransactionModel = require('../models/Transaction.model')

exports.createTransaction = async (data) => {
  return await TransactionModel.create(data)
}
exports.getTransaction = async (query) => {
  return await TransactionModel.paginate(query)
}
exports.getTransactionByMonth = async () => {
  const year = 2010
  return await TransactionModel.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(`${year}-01-01T00:00:00.000Z`),
          $lt: new Date()
        }
      }
    },
    {
      $group: {
        _id: { $month: '$createdAt' },
        count: { $sum: 1 }
      }
    },
    {
      $project: {
        month: '$_id',
        count: 1,
        _id: 0
      }
    },
    {
      $sort: { month: 1 }
    }
  ])
}
exports.findTransactionById = async (query) => {
  return await TransactionModel.findOne({ _id: query._id }).exec()
}
exports.updateAndCreateTransaction = async (query) => {
  return await TransactionModel.findOneAndUpdate(
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
exports.deleteTransactionId = async (query) => {
  return await TransactionModel.deleteOne({ _id: query._id })
}
