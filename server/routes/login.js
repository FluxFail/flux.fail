const uuid = require('uuid/v4');
const generatePassword = require('password-generator');
const db = require('../db');
const jwt = require('../utils/jwt');
const { sendLogin } = require('../utils/email');
const { validatePasswordless, validateExchange } = require('../utils/validate');

exports.passwordless = (req, res, next) => {
  validatePasswordless(req.body)
    .then(() => db('user').select('id').where('email', req.body.email))
    .then((rows) => {
      if (rows.length) {
        // Existing user
        return rows[0].id;
      }
      // New user, create
      const userId = uuid();
      return db('user')
        .insert({
          id: userId,
          email: req.body.email,
          created_at: new Date(),
        })
        .then(() => userId);
    })
    .then((userId) => {
      const grantToken = generatePassword();
      return db('auth')
        .insert({
          user: userId,
          grant: grantToken,
          created_at: new Date(),
        })
        .then(() => grantToken);
    })
    .then(grantToken => sendLogin(req.body.email, grantToken))
    .then(() => {
      res.status(202).end();
    }, err => next(err));
};

exports.exchange = (req, res, next) => {
  validateExchange(req.body)
    .then(() => db('auth').select().where('grant', req.body.token))
    .then((rows) => {
      if (!rows.length) {
        throw new Error('Invalid grant token');
      }
      const [grant] = rows;
      // TODO: Expiry time for grants?
      return jwt.sign(grant.user)
        .then(accessToken => db('auth')
          .del()
          .where('grant', req.body.token)
          .then(() => accessToken));
    })
    .then((accessToken) => {
      res.json({
        token: accessToken,
      });
    }, err => next(err));
};
