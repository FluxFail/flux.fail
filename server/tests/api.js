const request = require('supertest')
const { expect } = require('chai')
const moment = require('moment')

const api = request('http://127.0.0.1:8080')
const email = request('http://127.0.0.1:1080')

describe('FluxFail API', () => {
  let apiToken = null
  it('should be available', () => {
    return api
      .get('/')
      .expect(404)
  })
  describe('Authentication', () => {
    describe('with no email address', () => {
      it('should return validation error', () => {
        return api
          .post('/login/email')
          .send({})
          .expect(422)
          .then((res) => {
            expect(res.body.message).to.contain('Missing required property: email')
          })
      })
    })
    describe('with invalid email address', () => {
      it('should return validation error', () => {
        return api
          .post('/login/email')
          .send({
            email: 'foobar',
          })
          .expect(422)
          .then((res) => {
            expect(res.body.message).to.contain('invalid email')
          })
      })
    })
    describe('with valid email address', function () {
      this.slow(1000)
      let grantToken = null
      after(() => {
        // Clear received emails
        return email
          .delete('/api/emails')
      })
      it('should return 202', () => {
        return api
          .post('/login/email')
          .send({
            email: 'user@flux.fail',
          })
          .expect(202)
      })
      it('should have sent an email with grant token', () => {
        return email
          .get('/api/emails')
          .expect(200)
          .then((res) => {
            expect(res.body.length, 'Should have received email').to.equal(1)
            const matched = res.body[0].text.match(/\?token=([a-zA-Z0-9]+)/)
            expect(matched).to.be.an('array')
            grantToken = matched[1]
          })
      })
      it('should enable converting grant token to API token', () => {
        expect(grantToken, 'Must have grant token').to.be.a('string')
        return api
          .post('/login/exchange')
          .send({
            token: grantToken,
          })
          .expect(200)
          .then((res) => {
            expect(res.body.token).to.be.a('string')
            apiToken = res.body.token
          })
      })
    })
  })
  describe('Reporting Flux', () => {
    before(() => {
      expect(apiToken, 'Must be logged in').to.be.a('string')
    })
    describe('initially', () => {
      it('should return an empty list of delays', () => {
        return api
          .get('/flux/stream')
          .set('Authorization', `Bearer ${apiToken}`)
          .expect(200)
          .then((res) => {
            expect(res.body).eql([])
          })
      })
    })
    describe('when reporting a flux', () => {
      const fluxId = 'd52d4760-6fc3-4aec-b924-cb53242c55d4'
      it('should be possible to save', () => {
        return api
          .post('/flux')
          .set('Authorization', `Bearer ${apiToken}`)
          .send({
            id: fluxId,
            country: 'DE',
            city: 'Berlin',
            location: 'Alexanderplatz',
            vehicle: 4,
            line: 'U8',
            direction: 'Osloerstrasse',
            scheduledDeparture: moment.utc().subtract(4, 'minutes').toDate(),
            scheduledArrival: moment.utc().subtract(4, 'minutes').toDate()
          })
          .expect(202)
      })
      it('should be included in the flux stream', () => {
        return api
          .get('/flux/stream')
          .set('Authorization', `Bearer ${apiToken}`)
          .expect(200)
          .then((res) => {
            expect(res.body).to.be.an('array')
            expect(res.body.length).equal(1)
            expect(res.body[0].id).to.equal(fluxId)
            expect(res.body[0].country).to.equal('DE')
            expect(res.body[0].city).to.equal('Berlin')
            expect(res.body[0].location).to.equal('Alexanderplatz')
            expect(res.body[0].vehicle).to.equal(4)
            expect(res.body[0].line).to.equal('U8')
            expect(res.body[0].direction).to.equal('Osloerstrasse')
          })
      })
      it('should be possible to update', () => {
        return api
          .post('/flux')
          .set('Authorization', `Bearer ${apiToken}`)
          .send({
            id: fluxId,
            country: 'DE',
            city: 'Berlin',
            location: 'Alexanderplatz',
            vehicle: 4,
            line: 'U8',
            direction: 'Osloerstrasse',
            scheduledDeparture: moment.utc().subtract(4, 'minutes').toDate(),
            scheduledArrival: moment.utc().subtract(4, 'minutes').toDate(),
            departedAt: moment.utc().toDate(),
            arrivedAt: moment.utc().toDate()
          })
          .expect(202)
      })
      it('should have updated in the flux stream', () => {
        return api
          .get('/flux/stream')
          .set('Authorization', `Bearer ${apiToken}`)
          .expect(200)
          .then((res) => {
            expect(res.body).to.be.an('array')
            expect(res.body.length).equal(1)
            expect(res.body[0].id).to.equal(fluxId)
            expect(res.body[0].country).to.equal('DE')
            expect(res.body[0].city).to.equal('Berlin')
            expect(res.body[0].location).to.equal('Alexanderplatz')
            expect(res.body[0].vehicle).to.equal(4)
            expect(res.body[0].line).to.equal('U8')
            expect(res.body[0].direction).to.equal('Osloerstrasse')
          })
      })
      it('should be possible to delete', () => {
        return api
          .delete(`/flux/${fluxId}`)
          .set('Authorization', `Bearer ${apiToken}`)
          .expect(204)
      })
      it('should no longer be in the flux stream', () => {
        return api
          .get('/flux/stream')
          .set('Authorization', `Bearer ${apiToken}`)
          .expect(200)
          .then((res) => {
            expect(res.body).eql([])
          })
      })
    })
  })
  describe('Saving Favourites', () => {
    before(() => {
      expect(apiToken, 'Must be logged in').to.be.a('string')
    })
    describe('initially', () => {
      it('should be an empty list of favFlux', () => {
        return api
          .get('/fav')
          .set('Authorization', `Bearer ${apiToken}`)
          .expect(200)
          .then(res => {
            expect(res.body).eql([])
          })
      })
    })
    describe('when authenticated', () => {
      const favFluxId = 'd52d4760-6fc3-4aec-b924-cb53242c55d4'
      const connId = '6dc8293e-0334-4dc2-a931-d5449399c911'
      const rideId = '2afb558c-6e73-477c-b206-0779ee0762d1'
      it('should be possible to save', () => {
        return api
          .post('/fav')
          .set('Authorization', `Bearer ${apiToken}`)
          .send({
            id: favFluxId,
            connection: connId,
            ride: rideId,
            country: 'DE',
            city: 'Berlin',
            location: 'Alexanderplatz',
            vehicle: 4,
            line: 'U8',
            direction: 'Osloerstrasse',
            scheduledDeparture: moment.utc().toDate(),
            scheduledArrival: moment.utc().toDate()
          })
          .expect(202)
      })
      it('should appear in the list of saved favourites', () => {
        return api
          .get('/fav')
          .set('Authorization', `Bearer ${apiToken}`)
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an('array')
            expect(res.body.length).equal(1)
            expect(res.body[0].id).to.equal(favFluxId)
            expect(res.body[0].connection).to.equal(connId)
            expect(res.body[0].ride).to.equal(rideId)
            expect(res.body[0].country).to.equal('DE')
            expect(res.body[0].city).to.equal('Berlin')
            expect(res.body[0].location).to.equal('Alexanderplatz')
            expect(res.body[0].vehicle).to.equal(4)
            expect(res.body[0].line).to.equal('U8')
            expect(res.body[0].direction).to.equal('Osloerstrasse')
          })
      })
      it('should be editable', () => {
        return api
          .post('/fav')
          .set('Authorization', `Bearer ${apiToken}`)
          .send({
            id: favFluxId,
            connection: connId,
            ride: rideId,
            country: 'DE',
            city: 'Berlin',
            location: 'Alexanderplatz',
            vehicle: 8,
            line: 'U8',
            direction: 'Osloerstrasse',
            scheduledDeparture: moment.utc().subtract(4, 'minutes').toDate(),
            scheduledArrival: moment.utc().subtract(4, 'minutes').toDate()
          })
          .expect(202)
      })
      it('should have changed in the list of saved favourites', () => {
        return api
          .get('/fav')
          .set('Authorization', `Bearer ${apiToken}`)
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an('array')
            expect(res.body.length).equal(1)
            expect(res.body[0].id).to.equal(favFluxId)
            expect(res.body[0].connection).to.equal(connId)
            expect(res.body[0].ride).to.equal(rideId)
            expect(res.body[0].country).to.equal('DE')
            expect(res.body[0].city).to.equal('Berlin')
            expect(res.body[0].location).to.equal('Alexanderplatz')
            expect(res.body[0].vehicle).to.equal(8)
            expect(res.body[0].line).to.equal('U8')
            expect(res.body[0].direction).to.equal('Osloerstrasse')
          })
      })
      it('should be possible to delete', () => {
        return api
          .delete(`/fav/${favFluxId}`)
          .set('Authorization', `Bearer ${apiToken}`)
          .expect(204)
      })
      it('should no longer be listed as favourite', () => {
        return api
          .get('/fav')
          .set('Authorization', `Bearer ${apiToken}`)
          .expect(200)
          .then(res => {
            expect(res.body).eql([])
          })
      })
    })
  })
})
