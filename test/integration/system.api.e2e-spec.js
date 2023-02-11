const request = require('supertest');
const express = require('express');

const expressApp = require('../../src/express-app');
const { databaseConnection } = require('../../src/database');

const app = express();

beforeAll(async () => {
  await databaseConnection.Connect();
  await expressApp(app);
});

afterAll(async () => {
  await databaseConnection.Disconnect();
});

describe('System routes', () => {
  describe('GET /', () => {
    it('should return server status', async () => {
      const response = await request(app)
        .get('/')
        .expect('Content-Type', 'text/html; charset=utf-8')
        .expect(200);
      expect(response.text).toContain('The server is up and running!');
    });
  });
});
