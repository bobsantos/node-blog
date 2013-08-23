var url = require('url');
var fs = require('fs');
var post = require('./controllers/post');
var filenotfound = require('./controllers/404');

var indexRegex = /\/post\/?$/;
var createPostRegex = /\/post\/create\/?$/;
var postRegex = /^\/post\/\w-?/;

exports.get = function(request, response){
	request.requrl = url.parse(request.url, true);
	var path = request.requrl.pathname;
	console.log(path);
	
	if (indexRegex.test(path)) {
		post.index(request, response);
	} else if (createPostRegex.test(path)) {
		post.create(request, response);
	} else if (postRegex.test(path)) {
		post.get(request, response, path);
	} else {
		filenotfound.get(request, response);
	}
};