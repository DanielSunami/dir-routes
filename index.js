module.exports = (function(){
	var fs = require('fs');
	var path = require('path');
	var index = 'var path=require("path"),log="",fs=require("fs"),util=require("util"),router=require("express").Router();function req(e,r,t){var i=require(t);r=r.replace(/@/g,":"),log+=util.format("Mapping %s %s to %s \n",e.toUpperCase(),r.substring(__dirname.length,r.length),t),router[e](r.substring(__dirname.length,r.length),i)}function treeWalker(e,t){e.sort(function(e,r){return e.match(/:.+|@.+/)?1:e.match(/:.+|@.+/)?-1:0}),e.forEach(function(e){if(fs.statSync(t+"/"+e).isFile()){if(!(path.extname(t+"/"+e)in require.extensions))return;var r=path.basename(t+"/"+e,".js");if("index"!=r)try{req(r,t+"/",t+"/"+e)}catch(e){console.log("[dir-routes] "+e.stack),process.exit()}}else treeWalker(fs.readdirSync(t+"/"+e),t+"/"+e)})}treeWalker(fs.readdirSync(__dirname),__dirname),module.exports=router,module.exports.log=log;'
	var example = "module.exports = function(req, res){ res.send('Hello World!');};";
	var pathChecker = path.resolve(__dirname+'/../').split(path.sep);
	var fullPath = '';
	fullPath = pathChecker[pathChecker.length-1] === 'node_modules' ? path.resolve(__dirname+'/../../routes/') : fullPath = __dirname+'/routes/';

	try{
		if(!fs.statSync(fullPath).isDirectory()){
			console.log(fullPath+' isn\'t a directory');
			return "failed!";
		}
	}catch(e){
		if(e.errno == -2){
			console.log('[dir-routes] Building example in: '+fullPath);
			fs.mkdirSync(fullPath);
			fs.writeFileSync(fullPath+'/get.js', example);
		}
	}
	try{
		if(fs.statSync(fullPath+'/index.js').isFile()) return require(fullPath);
	}catch(e){
		if(e.errno == -2){
			fs.writeFileSync(fullPath+'/index.js', index);
			return require(fullPath);
		}
	}
})();