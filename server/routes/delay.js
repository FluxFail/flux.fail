const passport = require('passport');
const uuid = require('uuid/v4');
const db = require('../db');
const { validateDelay } = require('../utils/validate');

function getPlusOnes(delays) {
  const delayIds = delays.map(r => r.id);
  return db('delay')
    .select('id', 'user', 'parent')
    .whereIn('parent', delayIds)
    .then(plusOnes => delays.map((delay) => {
      const plusOnesForDelay = plusOnes.filter(plusOne => plusOne.parent === delay.id);
      return {
        ...delay,
        plusOnes: plusOnesForDelay.map(plusOne => ({
          id: plusOne.id,
          user: plusOne.user,
        })),
      };
    }));
}

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
              parent: (req.body.parent === '') ? null : req.body.parent,
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
            parent: (req.body.parent === '') ? null : req.body.parent,
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
    const onylUserDelays = Object.keys(req.query).includes('myDelays');
    if (limit > 100) {
      const err = new Error('Limit must be below 100');
      err.httpCode = 422;
      next(err);
      return;
    }

    const qAll = db('delay').select().whereNotNull('parent');
    if (onylUserDelays) {
      qAll.andWhere('user', req.user.id);
    }
    qAll
      .limit(limit)
      .offset(offset)
      .orderBy('scheduled_departure', 'desc')
      .then((myPlusOnes) => {
        const plusOneParentIds = myPlusOnes.map(r => r.parent);
        let query = db('delay')
          .select()
          .limit(limit)
          .offset(offset)
          .orderBy('scheduled_departure', 'desc')
          .whereNull('parent');

        if (onylUserDelays) {
          query = query
            .andWhere('user', req.user.id)
            .orWhere((builder) => {
              builder
                .whereIn('id', plusOneParentIds);
            });
        }

        query.then(delays => getPlusOnes(delays))
          .then(delays => res.json(delays))
          .catch(err => next(err));
      });
  },
];

exports.get = [
  passport.authenticate('bearer', {
    session: false,
    failWithError: true,
  }),
  (req, res, next) => {
    db('delay')
      .select()
      .where({ id: req.params.id })
      .then((delays) => {
        if (!delays.length) {
          const err = new Error(`Delay ${req.params.id} not found`);
          err.httpCode = 404;
          throw err;
        }
        if (delays[0].user !== req.user.id) {
          const err = new Error('Unauthorized');
          err.httpCode = 403;
        }
        return getPlusOnes(delays)
          .then((fullDelays) => {
            if (!fullDelays) {
              return {};
            }
            return fullDelays[0];
          });
      })
      .then((delay) => {
        res.json(delay);
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
