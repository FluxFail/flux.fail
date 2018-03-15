const passport = require('passport');
const uuid = require('uuid/v4');
const db = require('../db');
const { validateDelay } = require('../utils/validate');

exports.save = [
  passport.authenticate('bearer', {
    session: false,
    failWithError: true,
  }),
  (req, res, next) => {
    if (!req.body.id) {
      req.body.id = uuid();
    }
    validateDelay(req.body)
      .then(() => db('delay').select('user').where('id', req.body.id))
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
        res.status(202).set({
          location: `/delay/${req.body.id}`,
        }).end();
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
      .limit(limit)
      .offset(offset)
      .orderBy('date', 'desc')
      .then((rows) => {
        res.json(rows);
      }, err => next(err));
  },
];

exports.del = [
  passport.authenticate('bearer', {
    session: false,
    failWithError: true,
  }),
  (req, res, next) => {
    db('delay')
      .select('user')
      .where('id', req.params.id)
      .then((rows) => {
        if (!rows.length) {
          const err = new Error(`Delay ${req.params.id} not found`);
          err.httpCode = 404;
          throw err;
        }
        if (rows[0].user !== req.user.id) {
          const err = new Error('Unauthorized');
          err.httpCode = 403;
          throw err;
        }
        return db('delay')
          .del()
          .where('id', req.params.id);
      })
      .then(() => {
        res.status(204).end();
      }, err => next(err));
  },
];
