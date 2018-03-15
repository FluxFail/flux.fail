const request = require('supertest');
const { expect } = require('chai');

const api = request('http://127.0.0.1:8080');
const email = request('http://127.0.0.1:1080');

describe('FluxFail API', () => {
  let apiToken = null;
  it('should be available', () => {
    return api
      .get('/')
      .expect(404);
  });
  describe('Authentication', () => {
    describe('with no email address', () => {
      it('should return validation error', () => {
        return api
          .post('/login/email')
          .send({})
          .expect(422)
          .then((res) => {
            expect(res.body.message).to.contain('Missing required property: email');
          })
      });
    });
    describe('with invalid email address', () => {
      it('should return validation error', () => {
        return api
          .post('/login/email')
          .send({
            email: 'foobar',
          })
          .expect(422)
          .then((res) => {
            expect(res.body.message).to.contain('invalid email');
          })
      });
    });
    describe('with valid email address', () => {
      let grantToken = null;
      after(() => {
        // Clear received emails
        return email
          .delete('/api/emails')
      });
      it('should return 202', () => {
        return api
          .post('/login/email')
          .send({
            email: 'user@example.com',
          })
          .expect(202)
      });
      it('should have sent an email with grant token', () => {
        return email
          .get('/api/emails')
          .expect(200)
          .then((res) => {
            expect(res.body.length, 'Should have received email').to.equal(1);
            const matched = res.body[0].text.match(/\?token=([a-zA-Z0-9]+)/);
            expect(matched).to.be.an('array');
            grantToken = matched[1];
          });
      });
      it('should enable converting grant token to API token', () => {
        expect(grantToken, 'Must have grant token').to.be.a('string');
        return api
          .post('/login/exchange')
          .send({
            token: grantToken,
          })
          .expect(200)
          .then((res) => {
            expect(res.body.token).to.be.a('string');
            apiToken = res.body.token;
          });
      });
    });
  });
  describe('Delay reporting', () => {
    before(() => {
      expect(apiToken, 'Must be logged in').to.be.a('string');
    });
    describe('initially', () => {
      it('should return an empty list of delays', () => {
        return api
          .get('/delay')
          .set('Authorization', `Bearer ${apiToken}`)
          .expect(200)
          .then((res) => {
            expect(res.body).eql([]);
          });
      });
    });
    describe('when reporting a delay', () => {
      const delayId = 'd52d4760-6fc3-4aec-b924-cb53242c55d4';
      it('should be possible to save', () => {
        return api
          .post('/delay')
          .set('Authorization', `Bearer ${apiToken}`)
          .send({
            id: delayId,
            date: new Date(),
            type: 'subway',
            city: 'Berlin',
            line: 'U8',
            direction: 'Wittenau',
            delay: 3,
          })
          .expect(202);
      });
      it('should be included in list of delays', () => {
        return api
          .get('/delay')
          .set('Authorization', `Bearer ${apiToken}`)
          .expect(200)
          .then((res) => {
            expect(res.body).to.be.an('array');
            expect(res.body.length).equal(1);
            expect(res.body[0].id).to.equal(delayId);
            expect(res.body[0].line).to.equal('U8');
            expect(res.body[0].direction).to.equal('Wittenau');
          });
      });
      it('should be possible to update', () => {
        return api
          .post('/delay')
          .set('Authorization', `Bearer ${apiToken}`)
          .send({
            id: delayId,
            date: new Date(),
            type: 'subway',
            city: 'Berlin',
            line: 'U8',
            direction: 'Paracelsus-Bad',
            delay: 3,
            total_delay: 5,
          })
          .expect(202);
      });
      it('should have updated in list of delays', () => {
        return api
          .get('/delay')
          .set('Authorization', `Bearer ${apiToken}`)
          .expect(200)
          .then((res) => {
            expect(res.body).to.be.an('array');
            expect(res.body.length).equal(1);
            expect(res.body[0].id).to.equal(delayId);
            expect(res.body[0].line).to.equal('U8');
            expect(res.body[0].direction).to.equal('Paracelsus-Bad');
            expect(res.body[0].total_delay).to.equal(5);
          });
      });
      it('should be possible to delete', () => {
        return api
          .delete(`/delay/${delayId}`)
          .set('Authorization', `Bearer ${apiToken}`)
          .expect(204);
      });
      it('should no longer be in list of delays', () => {
        return api
          .get('/delay')
          .set('Authorization', `Bearer ${apiToken}`)
          .expect(200)
          .then((res) => {
            expect(res.body).eql([]);
          });
      });
    });
  });
});
