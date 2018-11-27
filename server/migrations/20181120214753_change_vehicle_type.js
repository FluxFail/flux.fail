/*
 *   - update vehicle from string to int
 */

const VehicleMap = {
  none: 0,
  bus: 1,
  train: 2,
  subway: 4,
  tram: 8,
  gondola: 16,
  ship: 32,
  flight: 64,
  rocket: 128,
};

const VehicleRevMap = {
  0: "none",
  1: "bus",
  2: "train",
  4: "subway",
  8: "tram",
  16: "gondola",
  32: "ship",
  64: "plan",
  128: "rocket",
};

exports.up = knex => knex.schema.table('delay', (t) => {
    t.integer('vehicle').index();
  })
  .then(() => knex('delay')
     .select('type', 'id')
     .then((rows) => Promise.all(rows.map((r) => knex('delay')
       .where('id', r.id)
       .update({
         vehicle: (r.type in VehicleMap) ? VehicleMap[r.type] : 0,
       })))))
  .then(() => knex.schema.table('delay', (t) => {
    t.dropColumn('type')
  }));

exports.down = knex => knex.schema.table('delay', (t) => {
     t.string('type').index();
   })
   .then(() => knex('delay')
     .select('vehicle', 'id')
     .then((rows) => Promise.all(rows.map((r) => knex('delay')
       .where('id', r.id)
       .update({
         type: (r.vehicle in VehicleRevMap) ? VehicleRevMap[r.vehicle] : 0,
       })))))
   .then(() => knex.schema.table('delay', (t) => {
     t.dropColumn('vehicle');
   }));