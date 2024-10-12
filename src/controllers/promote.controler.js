'use strict'
const {
  createPromotes,
  deletePromoteId,
  findPromotesById,
  getPromotes,
  updateAndCreatePromotes
} = require('../services/promote.service')

const createPromotesController = async (req, res) => {
  try {
    const data = req.body
    const Promotes = await createPromotes(data)
    return res.status(200).json(Promotes)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
const getPromotesController = async (req, res) => {
  try {
    const Promotes = await getPromotes()
    return res.status(200).json(Promotes)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
const getPromotesId = async (req, res) => {
  try {
    const Promotes = await findPromotesById({ _id: req.query._id })
    return res.status(200).json(Promotes)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
const updatePromotesId = async (req, res) => {
  try {
    const PromotesId = await findPromotesById({ _id: req.body._id })
    if (!PromotesId) {
      return res.status(403).json({ message: 'Promotes not exist' })
    }
    const Promotes = await updateAndCreatePromotes({ ...req.body, _id: req.body._id })
    return res.status(200).json(Promotes)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
const deletePromotesId = async (req, res) => {
  try {
    const PromotesId = await findPromotesById({ _id: req.query._id })
    if (!PromotesId) {
      return res.status(403).json({ message: 'Promotes not exist' })
    }
    await deletePromoteId({ _id: req.query._id })
    return res.status(200).json({
      message: 'delete success !'
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = {
  createPromotesController,
  getPromotesController,
  getPromotesId,
  updatePromotesId,
  deletePromotesId
}
