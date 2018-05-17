/*jslint esnext: true:*/

let minDist = 30;
let trig = false;

let app = require('express')(); 
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/dashboard.html');
});

http.listen(5000, function(){
	console.log('listening on *:5000');
});

let SerialPort = require('serialport');
let arduino = new SerialPort('/dev/ttyACM0', {
	baudRate: 9600
});



arduino.open((err) => {
	return console.log(err.message);
});

arduino.on('data', (data) => {
	// data value is distance in cm
	if (!trig) {
		let dist = data[data.length - 1];
		io.emit('dashboard', {'distance': dist});
		setShpritz(dist < minDist);
	}
});

function setShpritz(state) {
	arduino.write(state ? '1' : '0');
	io.emit('dashboard', {'shpritz': state});
}


io.on('connection', function(socket) {
	socket.on('dashboard', (msg) => {
		if (msg.hasOwnProperty('man_trigger')) {
			trig = msg.man_trigger;
			setShpritz(trig);
		}
	});	
});


