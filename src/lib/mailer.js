const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "028c9012e80e7d",
      pass: "c907c962ea100e"
    }
  })

