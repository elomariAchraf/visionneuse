// controller = require('../server')
//   , http_mocks = require('node-mocks-http')
//   , should = require('should')
//
// function buildResponse() {
//   return http_mocks.createResponse({eventEmitter: require('events').EventEmitter})
// }
//
// describe('Tests ', function() {
//
//   it('hello', function(done) {
//     var response = buildResponse()
//     var request  = http_mocks.createRequest({
//       method: 'GET',
//       url: '/hello',
//     })
//
//     response.on('end', function() {
//       response._getData().should.equal('world');
//       done()
//     })
//
//     controller.handle(request, response)
//   })
//
//   it('hello fail', function(done) {
//     var response = buildResponse()
//     var request  = http_mocks.createRequest({
//       method: 'POST',
//       url: '/hello',
//     })
//
//     response.on('end', function() {
//       // POST method should not exist.
//       // This part of the code should never execute.
//       done(new Error("Received a response"))
//     })
//
//     controller.handle(request, response, function() {
//       done()
//     })
//   })
//
//   it('upper', function(done) {
//     var response = buildResponse()
//     var request  = http_mocks.createRequest({
//       method: 'GET',
//       url: '/upper/monkeys',
//     })
//
//     response.on('end', function() {
//       response._getData().should.equal('MONKEYS');
//       done()
//     })
//
//     controller.handle(request, response)
//   })
// })
var expect  = require('chai').expect;
var request = require('request');


describe('Status and content', function() {
    describe ('Page racine', function() {
        it('status', function(done){
            request('http://localhost:8888/', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

        it('content', function(done) {
            request('http://localhost:8888/' , function(error, response, body) {
                expect(body).to.equal('Hello World');
                done();
            });
        });
    });

    describe ('About page', function() {
        it('status 1: route about', function(done){
            request('http://localhost:8888/about', function(error, response, body) {
                expect(response.statusCode).to.equal(404);
                done();
            });
        });

        it('status 2: route upload', function(done){
            request('http://localhost:8888/upload', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

    });
});
