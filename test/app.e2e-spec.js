const config = require('config');
const request = require('supertest');

const app = require('../src/app');

describe('HomeRoute (e2e)', () => {
  it('/ (GET)', () => {
    return request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200, { success: true, message: 'ok' });
  });
});
