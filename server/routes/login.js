const uuid = require('uuid/v4')
const generatePassword = require('password-generator')
const moment = require('moment')
const db = require('../db')
const jwt = require('../utils/jwt')
const sha256 = require('js-sha256')
const { sendLogin } = require('../utils/email')
const { validatePasswordless, validateExchange } = require('../utils/validate')

const salt = (process.env.JWT_SECRET || '')

exports.passwordless = (req, res, next) => {
  const dbEmail = sha256(salt + req.body.email)
  validatePasswordless(req.body)
    .then(() => db('user').select('id').where('email', dbEmail))
    .then((rows) => {
      if (rows.length) {
        // Existing user
        return db('user')
          .where('email', dbEmail)
          .update({ updated_at: moment.utc() })
          .then(() => rows[0].id)
      }
      // New user, create
      const userId = uuid()
      return db('user')
        .insert({
          id: userId,
          email: dbEmail,
          created_at: moment.utc()
        })
        .then(() => userId)
    })
    .then((userId) => {
      const grantToken = generatePassword()
      return db('auth')
        .insert({
          user: userId,
          grant: grantToken,
          created_at: moment.utc()
        })
        .then(() => grantToken)
    })
    .then(grantToken => sendLogin(req.body.email, grantToken))
    .then(() => res.status(202).end())
    .catch(err => next(err))
}

exports.exchange = (req, res, next) => {
  validateExchange(req.body)
    .then(() => db('auth').select().where('grant', req.body.token))
    .then((rows) => {
      if (!rows.length) {
        throw new Error('Invalid grant token')
      }
      const [grant] = rows
      // TODO: Expiry time for grants?
      return jwt.sign(grant.user)
        .then(accessToken => db('auth')
          .del()
          .where('grant', req.body.token)
          .then(() => res.json({ token: accessToken }))
        )
    })
    .catch(err => next(err))
}
