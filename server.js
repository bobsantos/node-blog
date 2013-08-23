var http = require('http');

var http_IP = '127.0.0.1';
var http_port = 8000;
var server = http.createServer(function(request, response){
	require('./router').get(request, response);
});
server.listen(http_port, http_IP);
console.log('[INFO] Listening to http://' + http_IP + ':' + http_port);


