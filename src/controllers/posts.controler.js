'use strict'
const {
  createPosts,
  getPosts,
  findPostsById,
  updateAndCreatePosts,
  deletePostId
} = require('../services/post.service')
const cloudinary = require('cloudinary').v2

const createPostsController = async (req, res) => {
  try {
    const data = req.body
    let path = ''
    req.files.forEach((files) => (path = path + files.path + ','))
    const newImages = path.substring(0, path.lastIndexOf(',')).split(',')
    let updatedDescription = data.description
    newImages.forEach((imgSrc, index) => {
      updatedDescription = updatedDescription.replace('src="[]"', `src="${imgSrc}"`)
    })
    const Posts = await createPosts({
      ...data,
      image: path.substring(0, path.lastIndexOf(',')),
      imageName: req.files.map((file) => file.filename),
      description: updatedDescription
    })
    return res.status(200).json(Posts)
  } catch (err) {
    cloudinary.api.delete_resources(req.files.map((file) => file.filename))
    res.status(500).json({ error: err.message })
  }
}
const getPostsController = async (req, res) => {
  try {
    const Posts = await getPosts()
    return res.status(200).json(Posts)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
const getPostsId = async (req, res) => {
  try {
    const Posts = await findPostsById({ _id: req.query._id })
    return res.status(200).json(Posts)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
const updatePostsId = async (req, res) => {
  try {
    const PostsId = await findPostsById({ _id: req.body._id })
    if (!PostsId) {
      return res.status(403).json({ message: 'Posts not exist' })
    }
    const Posts = await updateAndCreatePosts({ ...req.body, _id: req.body._id })
    return res.status(200).json(Posts)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
const deletePostsId = async (req, res) => {
  try {
    const PostsId = await findPostsById({ _id: req.query._id })
    if (!PostsId) {
      return res.status(403).json({ message: 'Posts not exist' })
    }
    await deletePostId({ _id: req.query._id })
    cloudinary.api.delete_resources(req.query?.imageName)
    return res.status(200).json({
      message: 'delete success !'
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = {
  createPostsController,
  getPostsController,
  getPostsId,
  updatePostsId,
  deletePostsId
}
