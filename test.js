var assert = require('assert');
var request = require('supertest');
var app = require('./app');


describe('Creator', function () {
  it('return all products', function (done) {
    request(app)
      .get('/creator/todo?token=Pippo')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
  it('insert work with token', function (done) {
    request(app)
      .post('/creator/add?token=Pippo')
      .set('Accept', 'application/json')
      .send({ idCr: 1, idAs: 2, activity: "Wash the car" })
      .expect(201)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
  it('insert work with idCr=idAs', function (done) {
    request(app)
      .post('/creator/add?token=Pippo')
      .set('Accept', 'application/json')
      .send({ idCr: 1, idAs: 1, activity: "Wash the car" })
      .expect(400)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
  it('delete correct', function (done) {
    request(app)
      .delete('/creator/del/1?token=Pippo')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
  it('delete wrong', function (done) {
    request(app)
      .delete('/creator/del/45?token=Pippo')
      .set('Accept', 'application/json')
      .expect(404)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
  it('set false correct', function (done) {
    request(app)
      .get('/creator/notCompleted/2?token=Pippo')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
  it('set false wrong', function (done) {
    request(app)
      .get('/creator/notCompleted/5?token=Pippo')
      .set('Accept', 'application/json')
      .expect(404)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
  it('set true correct', function (done) {
    request(app)
      .get('/assigne/completed/2?token=Pippo')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
  it('set true wrong', function (done) {
    request(app)
      .get('/assigne/completed/45?token=Pippo')
      .set('Accept', 'application/json')
      .expect(404)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
  it('add users correct', function (done) {
    request(app)
      .post('/creator/addUser?token=Pippo')
      .send({ id: 3, name: "Luca" })
      .set('Accept', 'application/json')
      .expect(201)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
  it('add users wrong', function (done) {
    request(app)
      .post('/creator/addUser?token=Pippo')
      .send({ id: 1, name: "Luca" })
      .send({ id: 1, name: "Luca" })
      .set('Accept', 'application/json')
      .expect(400)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
});

