'use strict'
const mongoose = require('mongoose')
const mogoUrl =
  'mongodb+srv://duynam11a11999:duynam12az%40@cluster0.rfi8d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const connectDb = () => {
  return mongoose
    .connect(mogoUrl)
    .then(() => {
      console.log('connect db success !')
    })
    .catch((err) => console.log('error connect !', err))
}
module.exports = connectDb
