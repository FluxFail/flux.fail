const nodemailer = require('nodemailer')
const format = require('string-template')
const url = require('url')

const smtpUrl = process.env.SMTP_URL || 'smtp://localhost'

const getTransportOptions = () => {
  const smtpConfig = url.parse(smtpUrl) // eslint-disable-line node/no-deprecated-api
  const options = {
    host: smtpConfig.hostname,
    port: smtpConfig.port
  }
  if (smtpConfig.auth) {
    const [smtpUser, smtpPass] = (smtpConfig.auth || '').split(':')
    options.auth = {
      user: smtpUser,
      pass: smtpPass
    }
  }
  return options
}

const tokenEmail = `
Welcome to Flux.Fail!

Use the following link to get started:

{app_url}/?token={token}

With love,

Flux.Fail team
support@flux.fail
`

exports.sendLogin = (email, grantToken) => {
  const transport = nodemailer.createTransport(getTransportOptions())
  return transport.sendMail({
    subject: 'Your login link for Flux.Fail',
    text: format(tokenEmail, {
      token: grantToken,
      app_url: process.env.APP_URL || 'http://localhost:8081'
    }),
    from: 'noreply@flux.fail',
    to: email
  })
}
