const request = require('supertest');

const api = request('http://127.0.0.1:8080');

describe('FluxFail API', () => {
  it('should be available', (done) => {
    api.get('/')
      .expect(404, done);
  });
});
