module.exports = (function(){
	var fs = require('fs');
	var path = require('path');
	var index = 'function req(r,e,t){var i=require(t);e=e.replace(/@/g,":");log+=util.format("Mapping %s to %s, method: %s\\n",e.substring(__dirname.length,e.length),t,r),router[r](e.substring(__dirname.length,e.length),i)}function treeWalker(r,e){r.sort(function(r,e){return r.match(/:.+|@.+/)?1:e.match(/:.+|@.+/)?-1:0}),r.forEach(function(r){var t=fs.statSync(e+"/"+r);if(t.isFile()){var i=path.extname(e+"/"+r);if(!(i in require.extensions))return;var n=path.basename(e+"/"+r,".js");return void("index"!=n&&req(n,e+"/",e+"/"+r))}treeWalker(fs.readdirSync(e+"/"+r),e+"/"+r)})}var path=require("path"),log="",fs=require("fs"),util=require("util"),router=require("express").Router();treeWalker(fs.readdirSync(__dirname),__dirname),module.exports=router,module.exports.log=log;'
	var example = "module.exports = function(req, res){ res.send('Hello World!');};";
	var fullPath = path.resolve(__dirname+'/../../routes/');
	
	try{
		if(!fs.statSync(fullPath).isDirectory()){
			console.log(fullPath+' isn\'t a directory');
			return "failed!";
		}
	}catch(e){
		if(e.errno == -2){
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
})()