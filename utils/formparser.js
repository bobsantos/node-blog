var qs = require('querystring');

exports.parse = function(request, callback){
	var body = '';
	request.on('data', function(chunk){
		body += chunk;
	});
	request.on('end', function(){
		callback(qs.parse(body));
	});
};