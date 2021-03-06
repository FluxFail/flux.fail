/*
 *   - rename date to scheduled_departure
 */
exports.up = knex => knex.schema.table('delay', (t) => {
  t.timestamp('scheduled_departure').defaultTo(knex.fn.now()).notNullable().index();
})
  .then(() => knex('delay')
    .select('date', 'id')
    .then(rows => Promise.all(rows.map(r => knex('delay')
      .where('id', r.id)
      .update({
        scheduled_departure: r.date,
      })))))
  .then(() => knex.schema.table('delay', (t) => {
    t.dropColumn('date');
  }));

exports.down = knex => knex.schema.table('delay', (t) => {
  t.timestamp('date').defaultTo(knex.fn.now()).notNullable().index();
})
  .then(() => knex('delay')
    .select('scheduled_departure', 'id')
    .then(rows => Promise.all(rows.map(r => knex('delay')
      .where('id', r.id)
      .update({
        date: r.scheduled_departure,
      })))))
  .then(() => knex.schema.table('delay', (t) => {
    t.dropColumn('scheduled_departure');
  }));
