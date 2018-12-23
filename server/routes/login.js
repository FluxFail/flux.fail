const uuid = require('uuid/v4');
const generatePassword = require('password-generator');
const db = require('../db');
const jwt = require('../utils/jwt');
const { sendLogin } = require('../utils/email');
const { validatePasswordless, validateExchange } = require('../utils/validate');
const { hash } = require('../utils/crypt');


async function insertUser(userEmail, userId) {
  try {
    console.log('creating new user');
    const res = await db('user')
      .insert({
        id: userId,
        email: userEmail,
        created_at: new Date(),
      });
  } catch (err) {
    console.error('insert user failed', err);
  }
}

async function getOrCreateUser(req) {
  const hashed = await hash(req.body.email);
  const rows = await db('user').select('id').where('email', req.body.email).orWhere('email', hashed);

  if (rows.length > 0) {
    // Existing user
    return rows[0].id;
  }
  const userId = uuid();
  await insertUser(hashed, userId);
  return userId;
}

exports.passwordless = (req, res, next) => {
  validatePasswordless(req.body)
    .then(() => getOrCreateUser(req))
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
