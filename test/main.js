var assert = require('assert'),
express = require('express'),
http = require('http'),
app = express(),
router = require('../index.js');

app.use(router);

http.createServer(app).listen(8888, function() {
	console.log('Listening on port %d', this.address().port);
	assert.equal(8888, this.address().port);
	http.get('http://127.0.0.1:8888', function(res){
		res.setEncoding('utf8');
		res.on('data', function(data){
			assert.equal(data,"Hello World!");
			process.exit();
		});
	});
});