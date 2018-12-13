/*
 *   - add username, country and city to user table
 */
exports.up = knex => knex.schema.table('user', (t) => {
  t.string('username');
  t.unique('username');
  t.string('country', 2).defaultTo('');
  t.string('city');
});

exports.down = knex => knex.schema.table('user', (t) => {
  t.dropColumn('city');
  t.dropColumn('country');
  t.dropUnique('username');
  t.dropColumn('username');
});
