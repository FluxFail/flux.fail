const passport = require('passport');
const uuid = require('uuid/v4');
const db = require('../db');

exports.save = [
  passport.authenticate('bearer', {
    session: false,
    failWithError: true,
  }),
  (req, res, next) => {
    if (!req.body.id) {
      req.body.id = uuid();
    }
    // TODO: Validate req.body against JSON schema
    db('delay')
      .select('user')
      .where('id', req.body.id)
      .then((rows) => {
        if (!rows.length) {
          // New delay entry, save
          return db('delay')
            .insert({
              ...req.body,
              user: req.user.id,
              created_at: new Date(),
            });
        }
        if (rows[0].user !== req.user.id) {
          // Delay owned by another user
          const err = new Error('Unauthorized');
          err.httpCode = 403;
          throw err;
        }
        return db('delay')
          .update({
            ...req.body,
            user: req.user.id,
            updated_at: new Date(),
          })
          .where('id', req.body.id);
      })
      .then(() => {
        res.status(202).end();
      }, err => next(err));
  },
];

exports.list = [
  passport.authenticate('bearer', {
    session: false,
    failWithError: true,
  }),
  (req, res, next) => {
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : 20;
    const offset = req.query.offset ? parseInt(req.query.offset, 10) : 0;
    if (limit > 100) {
      const err = new Error('Limit must be below 100');
      err.httpCode = 422;
      next(err);
      return;
    }
    db('delay')
      .select()
      .where('user', req.user.id)
      .orderBy('date', 'desc')
      .limit(limit)
      .offset(offset)
      .then((rows) => {
        res.json(rows);
      }, err => next(err));
  },
];
