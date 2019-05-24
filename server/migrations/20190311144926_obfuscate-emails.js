const sha256 = require('js-sha256')

const salt = (process.env.JWT_SECRET || '')

exports.up = knex => knex('user')
  .select('id', 'email')
  .then(users => Promise.all(users.map(user => knex('user')
    .where('id', user.id)
    .update({
      email: sha256(salt + user.email)
    })
  )))

exports.down = function(knex, Promise) {
  throw new Error('point of no return')
};
