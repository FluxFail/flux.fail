/*
 *   - rename date to scheduled_departure
 *   - add location field for where the user gets in
 *   - add self reference for delay weight
 *   - add optional comment filed
 */
exports.up = knex => knex.schema.table('delay', (t) => {
   t.uuid('parent').references('id').inTable('delay').nullable().index();
   t.string('location');
   t.string('comment');
})

exports.down = knex => knex.schema.table('delay', (t) => {
  t.dropColumn('comment');
  t.dropColumn('location');
  t.dropColumn('parent');
})