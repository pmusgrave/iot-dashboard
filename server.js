const express = require('express');
const app = express();
const http = require('http').Server(app);
const request = require('request');
const body_parser = require('body-parser');
const mongo = require('mongodb').MongoClient;
const mongo_url = 'mongodb://raspberrypi3bp:27017/temperatures';

/******************************************************
					EXPRESS
******************************************************/
app.use(body_parser.urlencoded({ extended:true }));
app.use(body_parser.json());
app.use(express.static(__dirname + '/build'));

app.post('/lights', (req, res) => {
	console.log('POST /lights');
	console.log(req.body);
});

const data = [
	{ name: 'Page A', uv: 1000, pv: 2400, amt: 2400, uvError: [75, 20] },
	{ name: 'Page B', uv: 300, pv: 4567, amt: 2400, uvError: [90, 40] },
	{ name: 'Page C', uv: 280, pv: 1398, amt: 2400, uvError: 40 },
	{ name: 'Page D', uv: 200, pv: 9800, amt: 2400, uvError: 20 },
	{ name: 'Page E', uv: 278, pv: null, amt: 2400, uvError: 28 },
	{ name: 'Page F', uv: 189, pv: 4800, amt: 2400, uvError: [90, 20] },
	{ name: 'Page G', uv: 189, pv: 4800, amt: 2400, uvError: [28, 40] },
	{ name: 'Page H', uv: 189, pv: 4800, amt: 2400, uvError: 28 },
	{ name: 'Page I', uv: 189, pv: 4800, amt: 2400, uvError: 28 },
	{ name: 'Page J', uv: 189, pv: 4800, amt: 2400, uvError: [15, 60] },
];
app.get('/temp', (req, res) => {
	console.log('GET /temp');
	res.json(data);
	// console.log('Connecting to mongodb...');
	// mongo.connect(mongo_url, (err,db) => {
	// 	if(err) throw err;
	// 	let collection = db.collection('temperatures').find;
	// 	console.log(collection);
	// });
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
