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

    resolve({
      limit,
      offset
    })
  })
}

function parseFilterParams (req) {
  return new Promise((resolve, reject) => {
    const response = {
      connection: req.query.connection ? req.query.connection : null,
      ride: req.query.ride ? req.query.ride : null
    }
    if (response.connection && !isUUID(response.connection, 4)) {
      let err = new Error('Invalud uuid4 for connection!')
      err.httpCode = 406
      return reject(err)
    }
    if (response.ride && !isUUID(response.ride, 4)) {
      let err = new Error('Invalid uud4 for ride!')
      err.httpCode = 406
      return reject(err)
    }
    resolve(response)
  })
}
