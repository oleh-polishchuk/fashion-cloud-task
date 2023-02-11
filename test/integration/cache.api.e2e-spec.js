const request = require('supertest');
const express = require('express');

const expressApp = require('../../src/express-app');
const { databaseConnection } = require('../../src/database');
const httpStatus = require('http-status');

const app = express();

beforeAll(async () => {
  await databaseConnection.Connect();
  await expressApp(app);
});

beforeEach(async () => {
  await databaseConnection.DeleteAllDocuments();
});

afterAll(async () => {
  await databaseConnection.DeleteAllDocuments();
  await databaseConnection.Disconnect();
});

describe('Cache routes', () => {
  describe('GET /cache/:key', () => {
    it('should return a random data for a missing key', async () => {
      const key = 'fake_key1';
      const response = await request(app)
        .get(`/cache/${key}`)
        .expect('Content-Type', /json/)
        .expect(httpStatus.OK);
      expect(response.body).toHaveProperty('data');
      expect(typeof response.body.data).toEqual('string');
    });

    it('should return a cached data for an existing key', async () => {
      const key = 'fake_key1';

      // cache 1 new key
      const response1 = await request(app)
        .get(`/cache/${key}`)
        .expect('Content-Type', /json/)
        .expect(httpStatus.OK);
      expect(response1.body).toHaveProperty('data');
      expect(typeof response1.body.data).toEqual('string');

      // get cache data for the same key
      const response2 = await request(app)
        .get(`/cache/${key}`)
        .expect('Content-Type', /json/)
        .expect(httpStatus.OK);
      expect(response2.body).toHaveProperty('data');
      expect(typeof response2.body.data).toEqual('string');

      // verify that the cached data is the same
      expect(response1.body.data).toEqual(response2.body.data);
    });
  });

  describe('GET /keys', () => {
    it('should return all stored keys in the cache', async () => {
      const response = await request(app)
        .get('/keys')
        .expect('Content-Type', /json/)
        .expect(httpStatus.OK);
      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe('PUT /cache/:key', () => {
    it('should create and updates the data for a given key', async () => {
      const key = 'fake_key1';

      // cache data for a given key
      const payload1 = { data: 'fake_data1' };
      const response1 = await request(app)
        .put(`/cache/${key}`)
        .send(payload1)
        .expect('Content-Type', /json/)
        .expect(httpStatus.CREATED);
      expect(response1.body).toHaveProperty('data');
      expect(response1.body).toMatchObject(payload1);

      // update data for the same key
      const payload2 = { data: 'fake_data2' };
      const response2 = await request(app)
        .put(`/cache/${key}`)
        .send(payload2)
        .expect('Content-Type', /json/)
        .expect(httpStatus.OK);
      expect(response2.body).toHaveProperty('data');
      expect(response2.body).toMatchObject(payload2);

      // verify that data was updated for the given key
      const response3 = await request(app)
        .get(`/cache/${key}`)
        .expect('Content-Type', /json/)
        .expect(httpStatus.OK);
      expect(response3.body).toHaveProperty('data');
      expect(response3.body).toEqual(payload2);
    });
  });

  describe('DELETE /cache/:key', () => {
    it('should remove a given key from the cache', async () => {
      // cache 3 keys
      await request(app)
        .put(`/cache/fake_key1`)
        .send({ data: 'fake_data1' })
        .expect('Content-Type', /json/)
        .expect(httpStatus.CREATED);

      await request(app)
        .put(`/cache/fake_key2`)
        .send({ data: 'fake_data2' })
        .expect('Content-Type', /json/)
        .expect(httpStatus.CREATED);

      await request(app)
        .put(`/cache/fake_key3`)
        .send({ data: 'fake_data3' })
        .expect('Content-Type', /json/)
        .expect(httpStatus.CREATED);

      // verify that cache has 3 keys cached
      const response1 = await request(app)
        .get(`/keys`)
        .expect('Content-Type', /json/)
        .expect(httpStatus.OK);

      expect(response1.body).toHaveProperty('data');
      expect(Array.isArray(response1.body.data)).toBe(true);
      expect(response1.body.data.length).toEqual(3);

      // removes 1 key from the cache
      const response2 = await request(app)
        .delete(`/cache/fake_key1`)
        .expect(httpStatus.NO_CONTENT);
      expect(response2.body).toEqual({});

      // verify that now cache has only 2 keys cached
      const response3 = await request(app)
        .get(`/keys`)
        .expect('Content-Type', /json/)
        .expect(httpStatus.OK);

      expect(response3.body).toHaveProperty('data');
      expect(Array.isArray(response3.body.data)).toBe(true);
      expect(response3.body.data.length).toEqual(2);
    });
  });

  describe('DELETE /cache', () => {
    it('should remove all keys from the cache', async () => {
      // cache 3 keys
      await request(app)
        .get(`/cache/fake_key1`)
        .expect('Content-Type', /json/)
        .expect(httpStatus.OK);

      await request(app)
        .get(`/cache/fake_key2`)
        .expect('Content-Type', /json/)
        .expect(httpStatus.OK);

      await request(app)
        .get(`/cache/fake_key3`)
        .expect('Content-Type', /json/)
        .expect(httpStatus.OK);

      // verify that cache has 3 keys cached
      const response1 = await request(app)
        .get(`/keys`)
        .expect('Content-Type', /json/)
        .expect(httpStatus.OK);

      expect(response1.body).toHaveProperty('data');
      expect(Array.isArray(response1.body.data)).toBe(true);
      expect(response1.body.data.length).toEqual(3);

      // remove all keys from the cache
      await request(app).delete(`/cache`).expect(httpStatus.NO_CONTENT);

      // verify all keys were removed from the cache
      const response2 = await request(app)
        .get(`/keys`)
        .expect('Content-Type', /json/)
        .expect(httpStatus.OK);

      expect(response2.body).toHaveProperty('data');
      expect(Array.isArray(response2.body.data)).toBe(true);
      expect(response2.body.data.length).toEqual(0);
    });
  });
});
