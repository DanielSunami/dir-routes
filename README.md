# dir-routes
Old fashioned way to deliver resources through HTTP. 

### Usage:
```javascript
var router = require('dir-routes'),
	express = require('express'),
	app = express();

	app.use(router);
```

### Example:
```javascript
var express = require('express'),
	http = require('http'),
	app = express(),
	router = require('dir-routes');

	app.param('param', function(req, res, next){
		next();
	});

	app.use(router);

	app.use(function(req, res) {
		res.status(404).end('404: Page not Found');
	});

	var httpServer = http.createServer(app);

	httpServer.listen(8080, function() {
		console.log('Listening on port %d', httpServer.address().port);
	});
```
Inspired by [@olado's](https://github.com/olado) doT.js express [example](https://github.com/olado/doT/blob/master/examples/express/lib/render/index.js).