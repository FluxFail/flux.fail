const passport = require('passport')
const db = require('../db')
const moment = require('moment')

const fluxTable = 'flux'

exports.public = [
  passport.authenticate('bearer', {
    session: false,
    failWithError: true
  }),
  (req, res, next) => {
    const utcNow = moment.utc()
    const lastMinute = utcNow.clone().startOf('minute')
    const lastHour = utcNow.clone().startOf('hour')
    const lastDay = utcNow.clone().startOf('day')
    const lastWeek = utcNow.clone().startOf('week')
    const lastMonth = utcNow.clone().startOf('month')
    const lastYear = utcNow.clone().startOf('year')
    return db(fluxTable)
      .count()
      .whereBetween('scheduledDeparture', [lastMinute.toDate(), utcNow.toDate()])
      .then(lastMinuteCount => db(fluxTable)
        .count()
        .whereBetween('scheduledDeparture', [lastHour.toDate(), utcNow.toDate()])
        .then(lastHourCount => db(fluxTable)
          .count()
          .whereBetween('scheduledDeparture', [lastDay.toDate(), utcNow.toDate()])
          .then(lastDayCount => db(fluxTable)
            .count()
            .whereBetween('scheduledDeparture', [lastWeek.toDate(), utcNow.toDate()])
            .then(lastWeekCount => db(fluxTable)
              .count()
              .whereBetween('scheduledDeparture', [lastMonth.toDate(), utcNow.toDate()])
              .then(lastMonthCount => db(fluxTable)
                .count()
                .whereBetween('scheduledDeparture', [lastYear.toDate(), utcNow.toDate()])
                .then(lastYearCount => {
                  return {
                    now: utcNow,
                    lastMinute: lastMinuteCount[0].count,
                    lastHour: lastHourCount[0].count,
                    lastDay: lastDayCount[0].count,
                    lastWeek: lastWeekCount[0].count,
                    lastMonth: lastMonthCount[0].count,
                    lastYear: lastYearCount[0].count
                  }
                }))))))
      .then(flux => res.json(flux))
      .catch(err => next(err))
  }
]

exports.private = [
  passport.authenticate('bearer', {
    session: false,
    failWithError: true
  }),
  (req, res, next) => {
    const utcNow = moment.utc()
    const lastMinute = utcNow.clone().startOf('minute')
    const lastHour = utcNow.clone().startOf('hour')
    const lastDay = utcNow.clone().startOf('day')
    const lastWeek = utcNow.clone().startOf('week')
    const lastMonth = utcNow.clone().startOf('month')
    const lastYear = utcNow.clone().startOf('year')
    return db(fluxTable)
      .count()
      .whereBetween('scheduledDeparture', [lastMinute.toDate(), utcNow.toDate()])
      .andWhere('user', req.user.id)
      .then(lastMinuteCount => db(fluxTable)
        .count()
        .whereBetween('scheduledDeparture', [lastHour.toDate(), utcNow.toDate()])
        .andWhere('user', req.user.id)
        .then(lastHourCount => db(fluxTable)
          .count()
          .whereBetween('scheduledDeparture', [lastDay.toDate(), utcNow.toDate()])
          .andWhere('user', req.user.id)
          .then(lastDayCount => db(fluxTable)
            .count()
            .whereBetween('scheduledDeparture', [lastWeek.toDate(), utcNow.toDate()])
            .andWhere('user', req.user.id)
            .then(lastWeekCount => db(fluxTable)
              .count()
              .whereBetween('scheduledDeparture', [lastMonth.toDate(), utcNow.toDate()])
              .andWhere('user', req.user.id)
              .then(lastMonthCount => db(fluxTable)
                .count()
                .whereBetween('scheduledDeparture', [lastYear.toDate(), utcNow.toDate()])
                .andWhere('user', req.user.id)
                .then(lastYearCount => {
                  return {
                    now: utcNow,
                    lastMinute: lastMinuteCount[0].count,
                    lastHour: lastHourCount[0].count,
                    lastDay: lastDayCount[0].count,
                    lastWeek: lastWeekCount[0].count,
                    lastMonth: lastMonthCount[0].count,
                    lastYear: lastYearCount[0].count
                  }
                }))))))
      .then(flux => res.json(flux))
      .catch(err => next(err))
  }
]
