const passport = require('passport')
const uuid = require('uuid/v4')
const db = require('../db')
const moment = require('moment')
const { validateFavFlux } = require('../utils/validate')
const favFluxTable = 'favFlux'

function queryFavFluxCount (userId) {
  return db(favFluxTable)
    .distinct('connection')
    .select('id', 'connection')
    .where('user', userId)
}

function queryFavFlux (userId) {
  return db(favFluxTable)
    .select()
    .where('user', userId)
}

exports.save = [
  passport.authenticate('bearer', {
    session: false,
    failWithError: true
  }),
  (req, res, next) => {
    if (!req.body.id) {
      req.body.id = uuid()
    }
    if (!req.body.ride) {
      req.body.ride = uuid()
    }
    if (!req.body.connection) {
      req.body.connection = uuid()
    }
    return queryFavFluxCount(req.user.id)
      .then(favFlux => {
        if (favFlux.length >= 10) {
          const err = new Error('Too many favourite connections!')
          err.httpCode = 406
          throw err
        }
        return validateFavFlux(req.body).then(() => db(favFluxTable)
          .select('user')
          .where('id', req.body.id))
          .then(rows => {
            if (!rows.length) {
              return db(favFluxTable)
                .insert({
                  ...req.body,
                  user: req.user.id,
                  createdAt: moment.utc().toDate(),
                  updatedAt: moment.utc().toDate()
                })
            }
            if (rows[0].user !== req.user.id) {
              const err = new Error('Unauthorized')
              err.httpCode = 403
              throw err
            }
            return db(favFluxTable)
              .update({
                ...req.body,
                updatedAt: moment.utc().toDate()
              })
              .where('id', req.body.id)
          })
          .then(() => res.status(202).set({
            id: req.body.id,
            connection: req.body.connection,
            ride: req.body.ride
          }).end())
      })
      .catch(err => next(err))
  }
]

exports.del = [
  passport.authenticate('bearer', {
    session: false,
    failWithError: true
  }),
  (req, res, next) => {
    return db(favFluxTable)
      .select('user')
      .where('id', req.params.id)
      .then(rows => {
        if (!rows.length) {
          const err = new Error(`Entry ${req.params.id} not found!`)
          err.httpCode = 404
          throw err
        }
        if (rows[0].user !== req.user.id) {
          const err = new Error('Unauthorized')
          err.httpCode = 403
          throw err
        }
        return db(favFluxTable)
          .del()
          .where('id', req.params.id)
      })
      .then(() => res.status(204).end())
      .catch(err => next(err))
  }
]

exports.get = [
  passport.authenticate('bearer', {
    session: false,
    failWithError: true
  }),
  (req, res, next) => {
    return db(favFluxTable)
      .select()
      .where('id', req.params.id)
      .then(rows => {
        if (!rows.length) {
          const err = new Error(`Entry ${req.params.id} not found!`)
          err.httpCode = 404
          throw err
        }
        const favFlux = rows[0]
        if (favFlux.user !== req.user.id) {
          const err = new Error('Unauthorized')
          err.httpCode = 403
          throw err
        }
        return favFlux
      })
      .then(flux => res.json(flux))
      .catch(err => next(err))
  }
]

exports.list = [
  passport.authenticate('bearer', {
    session: false,
    failWithError: true
  }),
  (req, res, next) => {
    return queryFavFlux(req.user.id)
      .then(flux => res.json(flux))
      .catch(err => next(err))
  }
]
