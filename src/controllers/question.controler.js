'use strict'
const {
  createQuestions,
  deleteQuestionId,
  findQuestionsById,
  getQuestions,
  updateAndCreateQuestions
} = require('../services/question.service')
const cloudinary = require('cloudinary').v2

const createQuestionsController = async (req, res) => {
  try {
    const data = req.body
    let path = ''
    req.files.forEach((files) => (path = path + files.path + ','))
    const newImages = path.substring(0, path.lastIndexOf(',')).split(',')
    let updatedDescription = data.description
    newImages.forEach((imgSrc, index) => {
      updatedDescription = updatedDescription.replace('src="[]"', `src="${imgSrc}"`)
    })
    const Questions = await createQuestions({
      ...data,
      image: path.substring(0, path.lastIndexOf(',')),
      imageName: req.files.map((file) => file.filename),
      description: updatedDescription
    })
    return res.status(200).json(Questions)
  } catch (err) {
    cloudinary.api.delete_resources(req.files.map((file) => file.filename))
    res.status(500).json({ error: err.message })
  }
}
const getQuestionsController = async (req, res) => {
  try {
    const Questions = await getQuestions()
    return res.status(200).json(Questions)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
const getQuestionsId = async (req, res) => {
  try {
    const Questions = await findQuestionsById({ _id: req.query._id })
    return res.status(200).json(Questions)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
const updateQuestionsId = async (req, res) => {
  try {
    const QuestionsId = await findQuestionsById({ _id: req.body._id })
    if (!QuestionsId) {
      return res.status(403).json({ message: 'Questions not exist' })
    }
    const Questions = await updateAndCreateQuestions({ ...req.body, _id: req.body._id })
    return res.status(200).json(Questions)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
const deleteQuestionsId = async (req, res) => {
  try {
    const QuestionsId = await findQuestionsById({ _id: req.query._id })
    if (!QuestionsId) {
      return res.status(403).json({ message: 'Questions not exist' })
    }
    await deleteQuestionId({ _id: req.query._id })
    cloudinary.api.delete_resources(req.query?.imageName)
    return res.status(200).json({
      message: 'delete success !'
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = {
  createQuestionsController,
  getQuestionsController,
  getQuestionsId,
  updateQuestionsId,
  deleteQuestionsId
}
