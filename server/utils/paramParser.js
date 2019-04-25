const { isUUID } = require('validator')

module.exports.parsePaginationParams = parsePaginationParams
module.exports.parseFilterParams = parseFilterParams

/*
  pagination: {
    limit: 'req.query.limit',
    offset: 'req.query.offset',
  },
  filter: {
    user: 'req.query.user',
    connection: 'req.query.connection',
    ride: 'req.query.ride'
    country: 'req.query.country',
    city: 'req.query.city',
    line: 'req.query.line',
  }
*/

function parsePaginationParams (req) {
  return new Promise((resolve, reject) => {
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : 20
    const offset = req.query.offset ? parseInt(req.query.offset, 10) : 0

    if (limit > 100) {
      const err = new Error('Pagination limit must be below 100')
      err.httpCode = 406
      reject(err)
    }

    resolve({ limit, offset })
  })
}

function parseFilterParams (req) {
  return new Promise((resolve, reject) => {
    const response = {
      country: req.query.country ? req.query.country : null,
      city: req.query.city ? req.query.city : null,
      line: req.query.line ? req.query.line : null,
      connection: req.query.connection ? req.query.connection : null,
      ride: req.query.ride ? req.query.ride : null
    }
    if (response.connection && !isUUID(response.connection, 4)) {
      let err = new Error('Invalid uuid4 for connection!')
      err.httpCode = 406
      return reject(err)
    }
    if (response.ride && !isUUID(response.ride, 4)) {
      let err = new Error('Invalid uuid4 for ride!')
      err.httpCode = 406
      return reject(err)
    }
    if (response.country && response.country.length !== 2) {
      let err = new Error('Invalid country-code bust be two letters!')
      err.httpCode = 406
      return reject(err)
    }
    if (response.city && response.city.length === 0) {
      let err = new Error('City must have at least one character!')
      err.httpCode = 406
      return reject(err)
    }
    if (response.line && response.line.length === 0) {
      let err = new Error('Line must have at least one character!')
      err.httpCode = 406
      return reject(err)
    }
    resolve(response)
  })
}
