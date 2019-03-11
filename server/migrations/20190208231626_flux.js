const moment = require('moment')
const uuid = require('uuid')

const migrationTimestamp = moment.utc().toDate()

exports.up = knex => knex.schema.createTable('fluxFav', (t) => {
  t.uuid('id').primary()
  t.timestamp('createdAt').notNullable()
  t.timestamp('updatedAt').nullable()
  t.uuid('user').references('id').inTable('user').notNullable().index()
  t.uuid('connection').notNullable().index()
  t.uuid('ride').notNullable().index()
  t.string('country', 2).notNullable()
  t.string('city').notNullable()
  t.string('location').notNullable()
  t.integer('vehicle').notNullable()
  t.string('line').notNullable()
  t.string('direction').notNullable()
  t.timestamp('scheduledDeparture').nullable()
  t.timestamp('scheduledArrival').nullable()
})
  .then(() => knex.schema.createTable('flux', (t) => {
    t.uuid('id').primary()
    t.timestamp('createdAt').notNullable()
    t.timestamp('updatedAt').nullable()
    // relations
    t.uuid('user').references('id').inTable('user').notNullable()
    t.uuid('fluxFav').nullable().index()
    t.uuid('connection').notNullable().index()
    t.uuid('ride').notNullable().index()
    // meta details
    t.string('country', 2).notNullable().index()
    t.string('city').notNullable().index()
    t.string('location').notNullable().index()
    t.integer('vehicle').notNullable().index()
    t.string('line').notNullable().index()
    t.string('direction').notNullable().index()
    // delay
    t.boolean('cancelled').notNullable().default(false).index()
    t.timestamp('scheduledDeparture').nullable().index()
    t.timestamp('scheduledArrival').nullable().index()
    t.timestamp('departedAt').nullable()
    t.timestamp('arrivedAt').nullable()
    // extra
    t.string('comment')
  }))
    .then(() => knex('delay')
      .select()
      .then(oldDelays => Promise.all(oldDelays.map(oldDelay => knex('flux')
        .insert({
          id: oldDelay.id,
          createdAt: oldDelay.created_at,
          updatedAt: oldDelay.updated_at ? oldDelay.updatedAt : migrationTimestamp,
          user: oldDelay.user,
          connection: uuid(),
          ride: uuid(),
          country: oldDelay.country ? oldDelay.country : '-',
          city: oldDelay.city ? oldDelay.city : '-',
          location: oldDelay.location ? oldDelay.location : '-',
          vehicle: oldDelay.vehicle,
          line: oldDelay.line,
          direction: oldDelay.direction,
          cancelled: false,
          scheduledDeparture: moment(oldDelay.scheduled_departure).startOf('minute').toDate(),
          departedAt: moment(oldDelay.scheduled_departure).clone().startOf('minute').add(oldDelay.delay_minutes, 'minutes').toDate(),
          comment: oldDelay.comment
        })
      ))))
        .then(() => knex.schema.dropTable('delay'))

exports.down = knex => {
  throw new Error('point of no return')
}
