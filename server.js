const express = require('express');
const app = express();
const http = require('http').Server(app);
const request = require('request');
const body_parser = require('body-parser');
const { Client } = require('pg');
const raspi = require('raspi');
const Serial = require('raspi-serial').Serial;

/******************************************************
					EXPRESS
******************************************************/
app.use(body_parser.urlencoded({ extended:true }));
app.use(body_parser.json());
app.use(express.static(__dirname + '/build'));

app.post('/lights', (req, res) => {
    console.log('POST /lights');
    console.log(req.body);
    let r = req.body["R"];
    let g = req.body["G"];
    let b = req.body["B"];
    send_rgb(r,g,b);
});

let data;
app.get('/temp', (req, res) => {
	console.log('GET /temp');
	console.log('Connecting to db...');
	const client = new Client({
	    user: 'sensortagdb',
	    host: '192.168.200.164',
	    database: 'sensortagdb',
	    password: 'sensortagdb',
	    port:5432,
	});
	client.connect();
	client.query(
	'SELECT * from temperatures,humidities \
	WHERE temperatures.id = humidities.id;', 
	(err,dbres) => {
		if (err) throw err;
		data = dbres.rows;
		console.log(data);
		res.json(data);
		client.end();
	});
});

/******************************************************
Raspberry Pi Serial
******************************************************/
const serial_options = {
    portId: "/dev/serial0",
    baudRate: 9600,
};
raspi.init(() => {
    send_rgb(0,0,0);
});
function send_rgb(r,g,b) {
    var serial = new Serial(serial_options);
    serial.open(() => {    
	setTimeout(() => {
	    serial.write("R"+String.fromCharCode(r));
	}, 100);
	setTimeout(() => {
	    serial.write("G"+String.fromCharCode(g));
	}, 500);
	setTimeout(() => {
	    serial.write("B"+String.fromCharCode(b));
	}, 1000);
    });
}

/******************************************************
					HTTP SERVER
******************************************************/
http.listen(80, function(){
  console.log('listening on port 80');
});

/*http.listen(8888, function(){
	console.log('listening on port 8888');
});*/
