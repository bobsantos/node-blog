exports.get = function(request, response){
	response.writeHeader(404);
	response.end('File Not Found');
};
