[![dir-routes](http://danielsunami.github.io/dir-routes/image/logo.png)](http://danielsunami.github.io/dir-routes/)

[![Build Status](https://travis-ci.org/DanielSunami/dir-routes.svg?branch=master)](https://travis-ci.org/DanielSunami/dir-routes)

Build your routes like in old fashioned way to deliver resources through HTTP. It's pretty much a concept than a package, think on the file path as a route and the file name as a HTTP method.

## What it does?
This package creates a folder named "routes" in the base directory of your application, then puts a 'Hello World!' example and an index.js file inside it, if there was already a folder named "routes" it just creates the index.js file. The real magic happens inside the routes folder, the index file iterates through all directories and subdirectories mapping all paths and files to an express router.

If you don't want to use this package you could simply use the index.js to `var router = require(./your-routes-folder)`.

**It supports [route parameters](http://expressjs.com/en/guide/routing.html#route-parameters) but Windows doesn't allow `:` in folder's name, use `@` instead**

**RegExp aren't supported yet**

## How the files should be

### get.js
```javascript
// your import
var mongoose = require('mongoose');

module.exports = function(req, res){
	// your stuff
};
```

If you want a post just change the file name to `post.js` or **any method** that you need, eg `delete.js`.

## Usage:
```javascript
var express = require('express'),
	app = express(),
	router = require('dir-routes');

app.use(router);
```
## Example App:
Simple login application describing how it works, just [download the zip](http://danielsunami.github.io/dir-routes/example.zip) and:
```
> unzip example.zip
> node example
< Listening on port 8080
```
Access via: http://127.0.0.1:8080

## Example:

### App File
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

### Folder Structure
```
-| node_modules
-| routes
 | -| @param
 |  | -| something
 |  |  | -| get.js
 |  |  | -| post.js
 |  | -| other
 |  |  | -| post.js
 | -| new
 |  | -| :param2
 |  |  | -| get.js
 |  | -| get.js
 | -| get.js
-| app.js
```

### Routes generated
```http
GET  /
GET  /:param/something/
POST /:param/something/
POST /:param/other/
GET  /new/:param2/
GET  /new/

```

### Same as

```javascript
var express = require('express'),
http = require('http'),
app = express(),
router = require('dir-routes');

app.param('param', function(req, res, next){
	next();
});

app.get('/', function(){
	// TO-DO
});

app.get('/:param/something/', function(){
	// TO-DO
});

app.post('/:param/something/', function(){
	// TO-DO
});

app.post('/:param/other/', function(){
	// TO-DO
});

app.get('/new/:param2/', function(){
	// TO-DO
});

app.get('/new/', function(){
	// TO-DO
});

app.use(function(req, res) {
	res.status(404).end('404: Page not Found');
});

var httpServer = http.createServer(app);

httpServer.listen(8080, function() {
	console.log('Listening on port %d', httpServer.address().port);
});
```

## Log
While mapping it appends messages to a string that is acessible via `router.log`. Example:

```javascript
var router = require('dir-routes');
console.log(router.log);
```

Inspired by [@olado's](https://github.com/olado) doT.js express [example](https://github.com/olado/doT/blob/master/examples/express/lib/render/index.js).
