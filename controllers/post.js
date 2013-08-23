var jade = require('jade');
var mongoose = require('mongoose');
var form = require('./../utils/formparser');

mongoose.connect('mongodb://localhost/blog');

var Schema = mongoose.Schema;
var postSchema = new Schema({
	title: String,
	content: String,
	path: String
});

var Post = mongoose.model('Post',postSchema);

exports.index =  function(request, response){
	var query = Post.find({});
	query.exec(function(err, posts){
		if (err) throw err

		var locals = {
			posts: posts
		};
		console.log(locals);
		response.end(jade.renderFile('./views/post/index.jade', locals));
	});
};

exports.create = function(request, response){
	form.parse(request, function(body){
		var path = body.title.toLowerCase().replace(/\s/g, '-');
		console.log(path);
		var post = new Post({
			title: body.title,
			content: body.content,
			path: path
		});

		post.save(function(err){
			if (err) throw err;

			response.writeHead(200,{
				'Content-type': 'application/json; charset=utf-8'
			});
			response.end(JSON.stringify(post));
		});
	});
};

exports.get = function(request, response, path){
	var url = path.split('/'); 
	var query = Post.findOne({path: url[url.length - 1]});
	query.exec(function(err, post){
		if (err) throw err

		var locals = {
			post: post
		};
		console.log(locals);
		response.end(jade.renderFile('./views/post/post.jade', locals));
	});
};