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
  const productDetails =
    data.type === 'buy'
      ? data.products
          .map((product) => {
            return `
        - Tên sản phẩm: ${product.productName}
        - Số lượng: ${product.quantity}
        - Giá: ${product.price} VND
        - Hình ảnh: ${product.image.split(',').join('\n                   ')} 
      `
          })
          .join('\n\n')
      : ''
  const mailOptions1 = {
    from: data.email,
    to: process.env.EMAIL_USER,
    subject: data.subject,
    text: `
      Bạn nhận được một đơn hàng mới.

      Thông tin người đặt hàng:
      - Tên: ${data?.shipping_address?.address_line1}
      - Địa chỉ: ${data?.shipping_address?.address_line2}, ${data?.shipping_address?.city}, ${data?.shipping_address?.state}, ${data?.shipping_address?.country}
      - Số điện thoại: ${data.phone}
      - Email: ${data.email}

      Thông tin sản phẩm:
      ${productDetails}

      Tổng giá trị đơn hàng: ${data?.total_price} VND
      Phương thức thanh toán: ${data?.shipping_address?.payment_method}

      Trạng thái: ${data?.status}

      Lời nhắn từ khách hàng:
      ${data.message}
    `
  }
  const mailOptions = {
    from: data.email,
    to: process.env.EMAIL_USER,
    subject: data.subject,
    text: `
      Bạn nhận được một yêu cầu mới từ ${data.name}.

      Chi tiết yêu cầu:
      - Tên: ${data.name}
      - Số điện thoại: ${data.phone}
      - Email: ${data.email}
      - Tin nhắn: ${data.message}
    `
  }
  try {
    await transporter.sendMail(data.type === 'buy' ? mailOptions1 : mailOptions)
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
