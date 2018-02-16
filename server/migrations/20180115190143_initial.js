/*
 *   - localized timestamp (sent as ISO datetime with UTC)
 *   - country (ISO 2 letter)
 *   - city (autocomplete?)
 *   - line
 *   - direction (end station)
 *   - delay in minutes
 *   - total travel delay caused by this line delay
 */
exports.up = (knex) => {
  knex.schema.createTable('user', (t) => {
    t.uuid('id').primary();
    t.string('email').index();
    t.timestamps();
  })
    .then(() => {
      knex.schema.createTable('auth', (t) => {
        t.uuid('user').notNullable().references('id').inTable('user');
        t.string('grant').index();
        t.timestamps();
      });
    })
    .then(() => {
      knex.schema.createTable('delay', (t) => {
        t.uuid('id').primary();
        t.uuid('user').notNullable().references('id').inTable('user');
        // Time information
        t.timestamps();
        // Transport type
        t.string('type').index();
        // Country (ISO 3166-1 alpha-2)
        t.string('country', 2).index();
        // City
        t.string('city').index();
        // Line
        t.string('line').index();
        // End station / direction
        t.string('direction');
        // Delay in minutes
        t.integer('delay');
        // Total delay caused by this segment
        t.integer('total_delay');
      });
    });
};

exports.down = (knex) => {
  knex.schema.dropTable('delay')
    .then(() => {
      knex.schema.dropTable('auth');
    })
    .then(() => {
      knex.schema.dropTable('user');
    });
};
