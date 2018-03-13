const { isEmail } = require('validator');
const uuid = require('uuid/v4');
const generatePassword = require('password-generator');
const db = require('../db');
const jwt = require('../utils/jwt');

exports.passwordless = (req, res, next) => {
  if (!isEmail(req.body.email)) {
    next(new Error('Invalid email address'));
    return;
  }
  db('user')
    .select('id')
    .where('email', req.body.email)
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
    .asCallback((err, grantToken) => {
      if (err) {
        next(err);
        return;
      }
      // TODO: Send email
      console.log(grantToken);
      res.status(202).end();
    });
};

exports.exchange = (req, res, next) => {
  if (!req.body.token) {
    next(new Error('Missing grant token'));
    return;
  }
  db('auth')
    .select()
    .where('grant', req.body.token)
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
    .asCallback((err, accessToken) => {
      if (err) {
        next(err);
        return;
      }
      res.json({
        token: accessToken,
      });
    });
};
