const db = require('../db')
const moment = require('moment')
const { median } = require('./math')

exports.subQueryRelatedFlux = (fluxFails) => {
  if (!fluxFails.length) {
    return new Promise((resolve, reject) => {
      resolve([])
    })
  }

  function calcFluxFail (fluxFail) {
    return {
      arrivalDelayedBy: moment.duration(
        moment(fluxFail.arrivedAt)
          .diff(moment(fluxFail.scheduledArrival))
      ).asMinutes(),
      departureDelayedBy: moment.duration(
        moment(fluxFail.departedAt)
          .diff(moment(fluxFail.scheduledDeparture))
      ).asMinutes()
    }
  }

  function calcFluxFailMedian (fluxFails) {
    const fluxDelays = fluxFails.map(fluxFail => calcFluxFail(fluxFail))
    return {
      acks: fluxFails.length,
      arrivalDelayedBy: median(fluxDelays.map(delay => delay.arrivalDelayedBy)),
      departureDelayedBy: median(fluxDelays.map(delay => delay.departureDelayedBy))
    }
  }

  return Promise.all(fluxFails.map(fluxFail => {
    if (!fluxFail.scheduledArrival || !fluxFail.scheduledDeparture) {
      return {
        ...fluxFail,
        relatedFlux: calcFluxFailMedian([fluxFail])
      }
    }

    return db('flux')
      .select()
      .where('country', fluxFail.country)
      .andWhere('city', fluxFail.city)
      .andWhere('line', fluxFail.line)
      .andWhere('direction', fluxFail.direction)
      .andWhere('location', fluxFail.location)
      .andWhere(builder => {
        builder
          .where('scheduledArrival', fluxFail.scheduledArrival)
          .orWhere('scheduledDeparture', fluxFail.scheduledDeparture)
      })
      .then(relatedReports => {
        return {
          ...fluxFail,
          relatedFlux: calcFluxFailMedian(relatedReports)
        }
      })
  }))
}
