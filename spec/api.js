const request = require('supertest');
const { expect } = require('chai');

const api = request('http://127.0.0.1:8080');

describe('FluxFail API', () => {
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
            expect(res.body.message).to.contain('Missing email');
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
            expect(res.body.message).to.contain('Invalid email');
          })
      });
    });
  });
});
