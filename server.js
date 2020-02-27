const express = require('express');
const app = express();
const http = require('http').Server(app);
const request = require('request');
const body_parser = require('body-parser');
const { Client } = require('pg');
const raspi = require('raspi');
const Serial = require('raspi-serial').Serial;

process.setMaxListeners(0);

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
    res.send("ok");
});

let data;
app.get('/temp', (req, res) => {
	console.log('GET /temp');
	console.log('Connecting to sensortagdb...');
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
    serial.open(),
    setTimeout(()=> {serial.write("R"+String.fromCharCode(r))},100);
    setTimeout(()=> {serial.write("G"+String.fromCharCode(g))},200);
    setTimeout(()=> {serial.write("B"+String.fromCharCode(b))},300);
    setTimeout(()=> {serial.close()}, 500);
}

/******************************************************
MQTT
******************************************************/
var mqtt = require('mqtt');
var mqtt_client  = mqtt.connect('mqtt://localhost');
mqtt_client.on('connect', function () {
    mqtt_client.subscribe('run', function (err) {
		if (!err) {
		    console.log("Connected to MQTT broker.");
		}
    })
})

mqtt_client.on('message', function (topic, message) {
	const run_data = JSON.parse(message);
    console.log(message.toString())
    console.log('Connecting to runlog db...');
	const psql_client = new Client({
	    user: 'sensortagdb',
	    host: '192.168.200.164',
	    database: 'runlog',
	    password: 'sensortagdb',
	    port:5432,
	});

	psql_client.connect();

	let query = {
        text: 'INSERT INTO runs (start_time, distance_m, duration) VALUES ($1, $2, $3);',
        values: [run_data.date, run_data.distance, run_data.duration]
    };

    psql_client.query(query, (err,res) => {
        console.log(err,res);
        psql_client.end();                                                                                                                            
    });
    // client.end()
})

/******************************************************
					HTTP SERVER
******************************************************/
http.listen(80, function(){
  console.log('listening on port 80');
});

/*http.listen(8888, function(){
	console.log('listening on port 8888');
});*/
