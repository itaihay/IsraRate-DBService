'use strict';

var request = require('supertest');

process.env.NODE_ENV = 'test';

var app = require('../app.js');
var _id = '';

/*
 *  ==== POST === 
 */

//Simple POST
describe('POST New Feed', function () {
  it('creates new feed and responds with json success message', function (done) {
    request(app)
      .post('/api/feed')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        'data': {"id":"lorem pisum dolor sit amet","user_id":3.5,"created_at":"2019-04-03T08:33:50.339Z","text":"lorem pisum dolor sit amet","place":"lorem pisum dolor sit amet","geo":"lorem pisum dolor sit amet","likes":3.5,"comments":3.5}
      })
      .expect(201)
      .end(function (err, res) {
        if (err) {
          throw err;
        }
        _id = res.body.data._id;
        done();
      });
  });
});

//Incorrect POST
describe('POST New Item Incorrectly', function () {
  it('Does not create new \'feed\' and responds with json error message', function (done) {
    request(app)
      .post('/api/feed')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        'dataX': {"id":"lorem pisum dolor sit amet","user_id":3.5,"created_at":"2019-04-03T08:33:50.339Z","text":"lorem pisum dolor sit amet","place":"lorem pisum dolor sit amet","geo":"lorem pisum dolor sit amet","likes":3.5,"comments":3.5}
      })
      .expect(500)
      .end(function (err, res) {
        if (err) {
          throw err;
        }
        done();
      });
  });
});



/*
 *  ==== GET === 
 */

// Get List of Feeds
describe('GET List of Feeds', function () {
  it('responds with a list of feed items in JSON', function (done) {
    request(app)
      .get('/api/feeds')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

// Get Single Feeds
describe('GET Feed by ID', function () {
  it('responds with a single feed item in JSON', function (done) {
    request(app)
      .get('/api/feed/' + _id)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});


// Get Single Feed Incorrectly
describe('GET Item by Incorrect ID', function () {
  it('responds with a error status for \'feed\' in JSON', function (done) {
    request(app)
      .get('/api/feed/' + _id + 'X')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
});


// Get Single Feed Incorrectly
describe('GET Item by missing ID', function () {
  it('responds with a error status for \'feed\' in JSON', function (done) {
    request(app)
      .get('/api/feed/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
});

/*
 *  ==== PUT === 
 */

//Simple PUT
describe('PUT Feed by ID', function () {
  it('updates feed item in return JSON', function (done) {
    request(app)
      .put('/api/feed/' + _id)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        'data': {
          'title': 'Hell Is Where There Are No Robots'
        }
      })
      .expect(202, done);
  });
});

// PUT with Incorrect id
describe('PUT Item by Incorrect ID', function () {
  it('Does not update \'feed\' & return JSON with error status', function (done) {
    request(app)
      .put('/api/feed/' + _id + 'X')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        data: {
          'title': 'Hell Is Where There Are No Robots'
        }
      })
      .expect(404, done);
  });
});

// PUT with Incorrect data
describe('PUT Item by Incorrect data', function () {
  it('Does not update feed & return JSON with error status', function (done) {
    request(app)
      .put('/api/feed/' + _id)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        'dataX': {
          'title': 'Hell Is Where There Are No Robots'
        }
      })
      .expect(500, done);
  });
});



/*
 *  ==== DELETE === 
 */

//Simple Delete
describe('DELETE Feed by ID', function () {
  it('should delete feed and return 200 status code', function (done) {
    request(app)
      .del('/api/feed/' + _id)
      .expect(202, done);
  });
});

//Incorrect Delete
describe('DELETE Item by Incorrect ID', function () {
  it('should NOT delete item and return 500 status code', function (done) {
    request(app)
      .del('/api/feed/' + _id + 'X')
      .expect(500, done);
  });
});
