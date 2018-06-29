process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../app');
const knex = require('../db/knex');

chai.use(chaiHttp);

describe('Client Routes', () => {
  it('should return the homepage with html', done => {
    chai.request(server)
      .get('/')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.html;
        done();
      });
  });
  it('should return a 404 for a route that does not exist', done => {
    chai.request(server)
      .get('/sad')
      .end((err, response) => {
        response.should.have.status(404);
        done();
      });
  });
});

describe('API Routes', () => {

  // beforeEach(async () => {
  //   // migrate rollback - before
  //   // migrate latest
  //   // seed
  //   await knex.migrate.rollback();
  //   await knex.migrate.latest();
  //   await knex.seed.run();
  //   done();
  // });

  beforeEach(function(done) {
    knex.migrate.rollback()
      .then(function() {
        knex.migrate.latest()
          .then(function() {
            return knex.seed.run()
              .then(function() {
                done();
              });
          });
      });
  });

  // afterEach(function(done) {
  //   knex.migrate.rollback()
  //     .then(function() {
  //       done();
  //     });
  // });

  describe('POST /api/v1/students', () => {
    it('should return all of the projects', done => {
      chai.request(server)
        .post('/api/v1/projects')
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(3);
          done();
        });
    });
  });
});