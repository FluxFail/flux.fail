const jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRET || 'fluxfail'

exports.sign = (user, expiresIn = '1y') => new Promise((resolve, reject) => {
  jwt.sign({
    user
  }, secret, {
    expiresIn,
    algorithm: 'HS256'
  }, (err, token) => {
    if (err) {
      reject(err)
      return
    }
    resolve(token)
  })
})

exports.verify = token => new Promise((resolve, reject) => {
  jwt.verify(token, secret, {
    algorithms: ['HS256']
  }, (err, decoded) => {
    if (err) {
      reject(err)
      return
    }
    if (!decoded.exp) {
      reject(new Error('Token has no expiry value'))
      return
    }
    if (decoded.exp * 1000 < Date.now()) {
      reject(new Error('Token has expired'))
      return
    }
    resolve(decoded)
  })
})
