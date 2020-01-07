const express = require('express');
const app = express();
const http = require('http').Server(app);
const request = require('request');
const body_parser = require('body-parser');

/******************************************************
                    EXPRESS
******************************************************/
function nocache(req, res, next) {
	res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
	res.header('Expires', '-1');
	res.header('Pragma', 'no-cache');
	next();
}

app.use(body_parser.urlencoded({ extended:true }));
app.use(body_parser.json());
app.use(express.static(__dirname + '/build'));

app.post('/lights', (req, res) => {
	console.log('POST /lights');
	console.log(req.body);
});

/******************************************************
                  HTTP SERVER
******************************************************/
/*http.listen(80, function(){
  console.log('listening on port 80');
});*/

http.listen(8888, function(){
	console.log('listening on port 8888');
});
