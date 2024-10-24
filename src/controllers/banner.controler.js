const {
  createBanners,
  deleteBannerId,
  findBanners,
  getBanners,
  updateAndCreateBanners
} = require('../services/banner.service')
const cloudinary = require('cloudinary').v2

const updateBannerId = async (req, res) => {
  try {
    const data = req.body
    let path = ''
    req.files.forEach((files) => (path = path + files.path + ','))
    const BannerId = await findBanners()
    if (!BannerId) {
      const Banner = await createBanners({
        ...data,
        image: path.substring(0, path.lastIndexOf(',')),
        imageName: req.files.map((file) => file.filename)
      })
      res.status(200).json({ status: 'Success', data: Banner })
    }
    if (!path) {
      const Banner = await updateAndCreateBanners({
        ...req.body,
        _id: BannerId?.[0]?._id,
        image: BannerId?.[0]?.image,
        imageName: BannerId?.[0]?.imageName
      })
      return res.status(200).json(Banner)
    }
    const Banner = await updateAndCreateBanners({
      ...req.body,
      _id: BannerId?.[0]?._id,
      image: path.substring(0, path.lastIndexOf(',')),
      imageName: req.files.map((file) => file.filename)
    })
    cloudinary.api.delete_resources(req.body?.imageName.split(','), (err, result) => {
      console.log(err, result)
    })
    return res.status(200).json(Banner)
  } catch (err) {
    cloudinary.api.delete_resources(req.files.map((file) => file.filename))
    res.status(500).json({ error: err.message })
  }
}
const getBanner = async (req, res) => {
  try {
    const Banner = await getBanners(req.query)
    return res.status(200).json(Banner)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
module.exports = {
  updateBannerId,
  getBanner
}
