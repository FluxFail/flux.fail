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
