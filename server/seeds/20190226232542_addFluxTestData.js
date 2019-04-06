const faker = require('faker')
const moment = require('moment')
const sha256 = require('js-sha256')
const uuid = require('uuid')

const salt = (process.env.JWT_SECRET || '')

const randomRide = () => {
  return faker.random.arrayElement([
    {
      vehicles: {
        bus: 1,
        tram: 8
      },
      prefixes: [ '', 'M' ],
      lineRange: { min: 1, max: 1000 }
    },
    {
      vehicles: {
        trains: 2
      },
      prefixes: [ 'S', 'S', 'S', 'S', 'RE', 'RB', 'IC', 'ICE' ],
      lineRange: { min: 1, max: 1000 }
    },
    {
      vehicles: {
        subway: 4
      },
      prefixes: [ 'U' ],
      lineRange: { min: 1, max: 1000 }
    }
  ])
}

const randomCommute = () => {
  return faker.random.objectElement({
    min: {
      commute: { min: 5, max: 20 },
      delay: { min: -5, max: 10 },
    },
    avg: {
      commute: { min: 15, max: 60 },
      delay: { min: -5, max: 30 },
    },
    max: {
      commute: { min: 60, max: 240 },
      delay: { min: -5, max: 60 }
    }
  })
}

const createFakeUser = (fromDate, toDate) => {
  if (typeof(fromDate) === 'undefined') {
    fromDate = moment.utc().toDate()
  }
  if (typeof(toDate) === 'undefined') {
    toDate = moment(fromDate).clone().add(60, 'days').toDate()
  }
  const timestamp = faker.date.between(fromDate, toDate)
  return {
    id: uuid(),
    email: sha256(salt + faker.internet.email()),
    createdAt: timestamp,
    updatedAt: timestamp,
  }
}

const createFakeFlux = (userId, fromDate, toDate) => {
  if (typeof(fromDate) === 'undefined') {
    fromDate = moment.utc().toDate()
  }
  if (typeof(toDate) === 'undefined') {
    toDate = moment(fromDate).clone().add(60, 'days').toDate()
  }

  const ride = randomRide()
  const commute = randomCommute()
  const scheduledDeparture = faker.date.between(fromDate, toDate)

  var fluxReport = {
    id: uuid(),
    user: userId,
    connection: uuid(),
    ride: uuid(),
    createdAt: scheduledDeparture,
    country: faker.address.countryCode(),
    city: faker.address.city(),
    location: faker.address.streetName(),
    vehicle: faker.random.objectElement(ride.vehicles),
    line: faker.random.number(ride.lineRange),
    direction: faker.address.streetName(),
    scheduledDeparture,
    scheduledArrival: null,
    cancelled: false,
    departedAt: null,
    arrivedAt: null,
    comment: faker.lorem.words(faker.random.number({ min: 1, max: 10 }))
  }

  const isCancelled = faker.random.number({ min: 1, max: 100 }) <= 2  // 2% are cancelled
  if (!isCancelled) {
    const commuteTime = faker.random.number(commute.commute)
    fluxReport.scheduledArrival = moment(scheduledDeparture).clone().add(
      commuteTime, 'minutes'
    ).toDate()
    const isDelayed = faker.random.number({ min: 0, max: 100 }) <= 25 // 25% are delayed
    if (isDelayed) {
      const delay = faker.random.number(commute.delay)
      fluxReport.departedAt = moment(scheduledDeparture).clone().add(delay).toDate()
      fluxReport.arrivedAt = moment(fluxReport.scheduledArrival).clone().add(delay).toDate()
    } else {
      fluxReport.departedAt = moment(scheduledDeparture).toDate()
      fluxReport.arrivedAt = fluxReport.scheduledArrival
    }
  }
  return fluxReport
}

exports.seed = function(knex, Promise) {
  const desiredFakeUsers = 123
  const desiredFluxCount = 12345
  const fakeUsers = []
  const fakeFlux = []

  for (let i = 0; i < desiredFakeUsers; i++) {
    fakeUsers.push(createFakeUser())
  }

  for (let i = 0; i < desiredFluxCount; i++) {
    fakeUser = faker.random.arrayElement(fakeUsers)
    fakeFlux.push(createFakeFlux(fakeUser.id))
  }

  return knex('flux').del()
    .then(() => knex('user').del())
    .then(() => knex('user').insert(fakeUsers))
    .then(() => Promise.all(fakeFlux.map(flux => {
      return knex('flux').insert(flux)
    })))
}
