const passport = require('passport')
const uuid = require('uuid/v4')
const db = require('../db')
const moment = require('moment')
const { validateFlux } = require('../utils/validate')
const { subQueryRelatedFlux } = require('../utils/flux')
const { parsePaginationParams } = require('../utils/paramParser')
const fluxTable = 'flux'

exports.save = [
  passport.authenticate('bearer', {
    session: false,
    failWithError: true
  }),
  (req, res, next) => {

    req.body.user = req.user.id

    if (!req.body.id) {
      req.body.id = uuid()
    }
    if (!req.body.connection) {
      req.body.connection = uuid()
    }
    if (!req.body.ride) {
      req.body.ride = uuid()
    }
    return validateFlux(req.body)
      .then(() => db(fluxTable).select('user').where('id', req.body.id))
      .then((rows) => {
        if (!rows.length) {
          // New trip entry, save
          return db(fluxTable)
            .insert({
              ...req.body,
              user: req.user.id,
              createdAt: moment.utc().toDate(),
              updatedAt: moment.utc().toDate()
            })
        }
        if (rows[0].user !== req.user.id) {
          // Delay owned by another user
          const err = new Error('Unauthorized')
          err.httpCode = 403
          throw err
        }
        return db(fluxTable)
          .update({
            ...req.body,
            updatedAt: moment.utc().toDate()
          })
          .where('id', req.body.id)
      })
      .then(() => res.status(202).end())
      .catch(next)
  }
]

exports.del = [
  passport.authenticate('bearer', {
    session: false,
    failWithError: true
  }),
  (req, res, next) => {
    return db(fluxTable)
      .select('user')
      .where('id', req.params.id)
      .then((rows) => {
        if (!rows.length) {
          const err = new Error(`Entry ${req.params.id} not found`)
          err.httpCode = 404
          throw err
        }
        if (rows[0].user !== req.user.id) {
          const err = new Error('Unauthorized')
          err.httpCode = 403
          throw err
        }
        return db(fluxTable)
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
    return db(fluxTable)
      .select()
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
        return rows[0]
      })
      .then(flux => res.json(flux))
      .catch(err => next(err))
  }
]

exports.listAll = [
  (req, res, next) => {
    return parsePaginationParams(req)
      .then(({ limit, offset }) => db(fluxTable)
        .select()
        .limit(limit)
        .offset(offset)
        .orderBy('scheduledDeparture', 'desc')
      )
      .then(subQueryRelatedFlux)
      .then(flux => res.json(flux))
      .catch(err => next(err))
  }
]

exports.listUser = [
  passport.authenticate('bearer', {
    session: false,
    failWithError: true
  }),
  (req, res, next) => {
    return parsePaginationParams(req)
      .then(({ limit, offset }) => {
        return db(fluxTable)
          .select()
          .where('user', req.user.id)
          .limit(limit)
          .offset(offset)
          .orderBy('scheduledDeparture', 'desc')
      })
      .then(flux => subQueryRelatedFlux(flux))
      .then(flux => res.json(flux))
      .catch(err => next(err))
  }
]

exports.getRide = [
  passport.authenticate('bearer', {
    session: false,
    failWithError: true
  }),
  (req, res, next) => {
    return db(fluxTable)
      .select()
      .where('user', req.user.id)
      .andWhere('ride', req.params.id)
      .then(subQueryRelatedFlux)
      .then(flux => res.json(flux))
      .catch(err => next(err))
  }
]

exports.getConnection = [
  passport.authenticate('bearer', {
    session: false,
    failWithError: true
  }),
  (req, res, next) => {
    return db(fluxTable)
      .select()
      .where('user', req.user.id)
      .andWhere('connection', req.params.id)
      .then(subQueryRelatedFlux)
      .then(res.json)
      .catch(err => next(err))
  }
]
