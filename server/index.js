const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const http = require('http')
const cors = require('cors')
require('./utils/auth')
const validate = require('./utils/validate')
const loginRoutes = require('./routes/login')
const fluxRoutes = require('./routes/flux')
const favFluxRoutes = require('./routes/favFlux')
const metricRoutes = require('./routes/metrics')

function getApp () {
  const app = express()
  validate.initialize()

  app.use(bodyParser.json())
  app.use(cors())
  app.use(passport.initialize())

  app.post('/login/email', loginRoutes.passwordless)
  app.post('/login/exchange', loginRoutes.exchange)

  // fluxFav
  app.delete('/fav/:id', favFluxRoutes.del)
  app.get('/fav/:id', favFluxRoutes.get)
  app.post('/fav', favFluxRoutes.save)
  app.get('/fav', favFluxRoutes.list)
  // fluxMeta
  app.get('/flux/cities/:country', fluxRoutes.citiesInCountry)
  // flux
  app.get('/flux/stream/connection/:id', fluxRoutes.getConnection)
  app.get('/flux/stream/ride/:id', fluxRoutes.getRide)
  app.get('/flux/stream/user', fluxRoutes.listUser)
  app.get('/flux/stream', fluxRoutes.listAll)
  app.get('/flux/user', metricRoutes.private)
  app.delete('/flux/:id', fluxRoutes.del)
  app.get('/flux/:id', fluxRoutes.get)
  app.post('/flux', fluxRoutes.save)
  app.get('/flux', metricRoutes.public)

  // 404 handling
  app.use((req, res, next) => {
    const err = new Error(`${req.path} not found`)
    err.httpCode = 404
    next(err)
  })

  // Provide errors as JSON
  app.use((err, req, res, next) => {
    if (err) {
      console.log(err)
    }
    const httpCode = err.httpCode || err.status || 500
    res.status(httpCode)
    const errorPayload = {
      message: err.message
    }
    if (httpCode === 422 && err.validationErrors) {
      errorPayload.validation = err.validationErrors
    }
    res.json(errorPayload)
  })

  return app
}

exports.startServer = (port) => {
  const p = new Promise((resolve, reject) => {
    const app = getApp()
    const server = new http.Server(app)
    server.listen(port, (err) => {
      if (err) {
        reject(err)
        return
      }
      resolve(server)
    })
  })
  return p
}

if (!module.parent) {
  // Run as standalone
  const httpPort = process.env.PORT || 8080
  exports.startServer(httpPort)
    .then(() => {
      console.log(`Listening on ${httpPort}`)
    })
    .catch((err) => {
      console.error(err)
      process.exit(1)
    })
}
