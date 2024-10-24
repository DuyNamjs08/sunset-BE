'use strict'
const {
  createProjectFinish,
  deleteProjectFinishId,
  findProjectFinishById,
  getProjectFinish,
  updateAndCreateProjectFinish
} = require('../services/projectFinish.service')
const cloudinary = require('cloudinary').v2

const createprojectFinishsController = async (req, res) => {
  try {
    const data = req.body
    let path = ''
    req.files.forEach((files) => (path = path + files.path + ','))
    const newImages = path.substring(0, path.lastIndexOf(',')).split(',')
    let updatedDescription = data.description
    newImages.forEach((imgSrc, index) => {
      updatedDescription = updatedDescription.replace('src="[]"', `src="${imgSrc}"`)
    })
    const projectFinishs = await createProjectFinish({
      ...data,
      image: path.substring(0, path.lastIndexOf(',')),
      imageName: req.files.map((file) => file.filename),
      description: updatedDescription
    })
    return res.status(200).json(projectFinishs)
  } catch (err) {
    cloudinary.api.delete_resources(req.files.map((file) => file.filename))
    res.status(500).json({ error: err.message })
  }
}
const getprojectFinishsController = async (req, res) => {
  try {
    const projectFinishs = await getProjectFinish()
    return res.status(200).json(projectFinishs)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
const getprojectFinishsId = async (req, res) => {
  try {
    const projectFinishs = await findProjectFinishById({ _id: req.query._id })
    return res.status(200).json(projectFinishs)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
const updateprojectFinishsId = async (req, res) => {
  try {
    const projectFinishsId = await findProjectFinishById({ _id: req.body._id })
    if (!projectFinishsId) {
      return res.status(403).json({ message: 'projectFinishs not exist' })
    }
    const projectFinishs = await updateAndCreateProjectFinish({ ...req.body, _id: req.body._id })
    return res.status(200).json(projectFinishs)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
const deleteprojectFinishsId = async (req, res) => {
  try {
    const projectFinishsId = await findProjectFinishById({ _id: req.query._id })
    if (!projectFinishsId) {
      return res.status(403).json({ message: 'projectFinishs not exist' })
    }
    await deleteProjectFinishId({ _id: req.query._id })
    cloudinary.api.delete_resources(req.query?.imageName)
    return res.status(200).json({
      message: 'delete success !'
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = {
  createprojectFinishsController,
  getprojectFinishsController,
  getprojectFinishsId,
  updateprojectFinishsId,
  deleteprojectFinishsId
}
