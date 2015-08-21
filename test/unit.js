var request = require('superagent');
var expect = require('expect.js');
var assert = require('assert');
var express = require('express');
var mysql = require('mysql');
var app = express();
app.use(express.bodyParser()); // need this to see the body in req object
var serverport = 3000;
require('./routes')(app, serverport);
app.use('/styles', express.static(__dirname + '/styles'));
console.log('The node server is now running on port ' + serverport);
module.exports = app;
  
describe('Suite one', function(){
 it (function(done){
   request.post('localhost:8080').end(function(res){
    expect(res).to.exist;
    expect(res.status).to.equal(200);
    expect(res.body).to.contain('world');
    done();
   });
  });
});

describe('String#split', function(){
  it('should return an array', function(){
    assert(Array.isArray('a,b,c'.split(',')));
  });
});

describe('Req 1: Landing page functionality', function(){
  before(function (done) {
    this.timeout(5000);
    async.series([
      function (cb) {
        connection.query('INSERT INTO mocha_test_table '+
          'VALUE("TEST","TEST","","");',function(err){
            done();
          });
      },
      function (cb) {
        connection.query('SELECT * FROM mocha_test_table WHERE user_name="TEST"'+
          ' AND email="TEST";',function(err,results){
            results.length.should.not.equal(0);
            done();
          });
      }
    ], done);
  });
  it('1.1 Text of landing page', function(done){
    request(app)
      .get('/')
      .expect(200)
      .end(function (err, res) {
        res.text.should.include('Home');
        done();
      });
  });
  it('1.2 Link to the login page', function(done){
    request(app)
      .get('/')
      .expect(200)
      .end(function (err, res) {
        res.text.should.include('/login');
        done();
      });
  });
});