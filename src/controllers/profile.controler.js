'use strict'
const {
  createProfiles,
  updateAndCreateProfiles,
  getProfiles
} = require('../services/profile.service')
const cloudinary = require('cloudinary').v2

const getProfileControler = async (req, res) => {
  try {
    const Profile = await getProfiles()
    return res.status(200).json(Profile)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const updateAndCreateProfileId = async (req, res) => {
  try {
    const data = req.body
    const Profile = await getProfiles()
    if (Profile.length === 0) {
      if (!req.file?.path) {
        return res.status(403).json({ message: 'image is required' })
      }
      const profile = await createProfiles({
        ...data,
        image: req.file.path,
        imageName: req.file.filename,
        logo: req.file.filename
      })
      return res.status(200).json(profile)
    } else {
      if (!req.file?.path) {
        const updateprofile = await updateAndCreateProfiles({
          ...req.body,
          _id: Profile[0]._id,
          image: Profile[0].image,
          imageName: Profile[0].imageName,
          logo: Profile[0].imageName
        })
        return res.status(200).json(updateprofile)
      }
      const updateprofile = await updateAndCreateProfiles({
        ...req.body,
        _id: Profile[0]._id,
        image: req.file.path,
        imageName: req.file.filename,
        logo: req.file.filename
      })
      cloudinary.uploader.destroy(req.body?.imageName)
      return res.status(200).json(updateprofile)
    }
  } catch (err) {
    cloudinary.uploader.destroy(req.file?.filename)
    res.status(500).json({ error: err.message })
  }
}

module.exports = {
  getProfileControler,
  updateAndCreateProfileId
}
