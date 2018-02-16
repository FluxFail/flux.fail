const { isEmail } = require('validator');
const uuid = require('uuid/v4');
const generatePassword = require('password-generator');
const db = require('../db');

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
