var request = require('superagent');
var expect = require('expect.js');

// Test structure
describe('homepage', function(){
    it("should contain Cash Tracker",function(done){
    	request
    	.get('localhost:8080')
    	.end(function(err, res){
            expect(res.status).to.equal(200);
            done();
        });
    });
});