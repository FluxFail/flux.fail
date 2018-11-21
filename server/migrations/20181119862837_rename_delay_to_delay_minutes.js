/*
 *   - rename delay to delay_minutes
 */
exports.up = knex => knex.table('delay', (t) => {
    t.integer('delay_minutes');
  })
  .then(() => knex('delay')
    .select('delay', 'id')
    .then((rows) => Promise.all(rows.map((r) => knex('delay')
      .where('id', r.id)
      .update({
        delay_minutes: r.delay,
      })))))
  .then(() => knex.table('delay', (t) => {
    t.dropColumn('delay');
  }))

exports.down = knex => knex.table('delay', (t) => {
    t.integer('delay');
  })
  .then(() => knex('delay')
    .select('delay_minutes', 'id')
    .then((rows) => Promise.all(rows.map((r) => knex('delay')
      .where('id', r.id)
      .update({
        delay: r.delay_minutes,
    })))))
  .then(() => knex.table('delay', (t) => {
    t.dropColumn('delay_minutes');
  }))
