var jade = require('jade');
var form = require('./../utils/formparser');

exports.index =  function(request, response){
	response.end(jade.renderFile('./views/post/index.jade',{}));
};

exports.create = function(request, response){
	form.parse(request, function(body){
		var post = {
			title: body.title,
			content: body.content
		};

		response.writeHead(200,{
			'Content-type': 'application/json; charset=utf-8'
		});
		response.end(JSON.stringify(post));
	});
};