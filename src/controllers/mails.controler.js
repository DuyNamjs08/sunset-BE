'use strict'
const { createMails, getMails } = require('../services/mails.service')
const nodemailer = require('nodemailer')
require('dotenv').config()

const sendEmail = async (data) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })
  const mailOptions = {
    from: data.email,
    to: process.env.EMAIL_USER,
    subject: data.subject,
    text: data.message
  }
  try {
    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    throw new Error(error.message)
  }
}
const createMailsController = async (req, res) => {
  try {
    const data = req.body
    const Mails = await createMails(data)
    await sendEmail(data)
    return res.status(200).json(Mails)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
const getMailsController = async (req, res) => {
  try {
    const Mails = await getMails()
    return res.status(200).json(Mails)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
module.exports = {
  createMailsController,
  getMailsController
}
