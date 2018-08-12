const passport = require('passport');
const uuid = require('uuid/v4');
const db = require('../../db');
const { validateDelay } = require('../../utils/validate');

module.exports.delayService = {
    getDelays(limit, offset, userid) {
        [
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
        ]
    }
  };