
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('delay', (t) => {
      // Delays can be caused by vehicles ahead of time.
      t.integer('ahead').notNullable().defaultTo(0);
      // Delays can be experienced as positive, i.e. when
      // catching a connection because it is late.
      t.boolean('positive').notNullable().defaultTo(false);
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('delay', (t) => {
      t.dropColumn('ahead');
      t.dropColumn('positive');
    }),
  ]);
};
